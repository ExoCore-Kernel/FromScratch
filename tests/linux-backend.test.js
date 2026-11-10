import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import test from 'node:test';
import Blockly from 'blockly/core';
import {registerOsBlocks} from '../src/blocks/os-blocks.js';
import '../src/blocks/event-blocks.js';
import {registerCustomBlockSpecs} from '../src/custom-blocks.js';
import {cGenerator} from '../src/generator/c-generator.js';
import {extensionBlocks} from '../src/blocks/block-catalog.js';
import {linuxCapabilities} from '../src/blocks/linux-capabilities.js';
import {createCpio, createProjectInitramfs, combineInitramfs, patchLinuxIso, LINUX_ISO_SIGNATURE} from '../src/linux-image.js';

registerOsBlocks();
const decoder = new TextDecoder();
function unpack(bytes) {
  const entries = new Map();
  for (let offset = 0; offset < bytes.length;) {
    assert.equal(offset % 4, 0);
    assert.equal(decoder.decode(bytes.subarray(offset, offset + 6)), '070701');
    const value = index => parseInt(decoder.decode(bytes.subarray(offset + 6 + index * 8, offset + 14 + index * 8)), 16);
    const length = value(6), nameSize = value(11), mode = value(1);
    const name = decoder.decode(bytes.subarray(offset + 110, offset + 110 + nameSize - 1));
    const start = (offset + 110 + nameSize + 3) & ~3;
    entries.set(name, {mode, data: bytes.slice(start, start + length)});
    offset = (start + length + 3) & ~3;
  }
  return entries;
}
function fakeElf() {
  const elf = new Uint8Array(64); elf.set([0x7f, 69, 76, 70, 2, 1]); elf[16] = 2; elf[18] = 62; return elf;
}

test('initramfs preserves executable permissions, binary files, empty files and names', () => {
  const archive = createProjectInitramfs(fakeElf(), [
    {name: 'odd.bin', bytes: new Uint8Array([0, 255, 1])},
    {name: 'empty.txt', bytes: new Uint8Array()},
  ]);
  const entries = unpack(archive);
  assert.equal(entries.get('init').mode, 0o100755);
  assert.deepEqual(entries.get('assets/odd.bin').data, new Uint8Array([0, 255, 1]));
  assert.equal(entries.get('assets/empty.txt').data.length, 0);
  assert.equal(decoder.decode(entries.get('assets/.manifest').data), 'odd.bin\nempty.txt\n');
  const drivers = createCpio([{name: 'drivers', mode: 0o40755}]);
  assert.equal(unpack(combineInitramfs(drivers, archive)).get('init').mode, 0o100755);
});

test('initramfs rejects malformed programs, traversal, duplicate assets and oversized manifests', () => {
  assert.throws(() => createProjectInitramfs(new Uint8Array()), /ELF/);
  for (const name of ['../escape', '/absolute', 'x\0y']) assert.throws(() => createCpio([{name}]), /path/);
  assert.throws(() => createProjectInitramfs(fakeElf(), [{name: '../bad'}]), /asset name/);
  assert.throws(() => createProjectInitramfs(fakeElf(), [{name: 'a'}, {name: 'a'}]), /duplicate/);
  assert.throws(() => createProjectInitramfs(fakeElf(), Array.from({length: 65}, (_, i) => ({name: `file${i}`}))), /64/);
});

test('every visible Linux extension has a runtime implementation and generator', async () => {
  const runtime = await readFile(new URL('../kernel/extensions_runtime.c', import.meta.url), 'utf8');
  const functions = new Set([...runtime.matchAll(/\b(blockos_ext_\w+)\([^;{}]*\)\s*\{/g)].map(match => match[1]));
  assert.deepEqual([...linuxCapabilities].sort(), [...functions].sort());
  for (const block of extensionBlocks) {
    assert.ok(functions.has(block.cName), block.cName);
    assert.equal(typeof cGenerator.forBlock[block.type], 'function');
  }
  assert.ok(!extensionBlocks.some(block => /interrupts_|virtual_memory_|pci_and_devices_|usb_/.test(block.cName)));
});

test('bundled legacy projects generate Linux startup functions without privileged instructions', async () => {
  for (const name of await readdir(new URL('../public/examples/', import.meta.url))) {
    if (!name.endsWith('.json')) continue;
    const project = JSON.parse(await readFile(new URL(`../public/examples/${name}`, import.meta.url), 'utf8'));
    registerCustomBlockSpecs(project.customBlocks ?? []);
    const workspace = new Blockly.Workspace();
    try {
      Blockly.serialization.workspaces.load(project.workspace, workspace);
      const code = cGenerator.workspaceToCode(workspace);
      assert.match(code, /void blockos_main\(void\)/, name);
      assert.doesNotMatch(code, /kernel_main|cli; hlt/);
    } finally { workspace.dispose(); }
  }
});

test('legacy hardware blocks produce a migration error', () => {
  const workspace = new Blockly.Workspace();
  try {
    const start = workspace.newBlock('os_start');
    const privileged = workspace.newBlock('osx_cpu_disable_cpu_interrupts');
    start.getInput('BODY').connection.connect(privileged.previousConnection);
    assert.throws(() => cGenerator.workspaceToCode(workspace), /legacy block.*Linux service/);
  } finally { workspace.dispose(); }
});

test('timer events dispatch by Linux elapsed milliseconds', () => {
  const workspace = new Blockly.Workspace();
  try {
    workspace.newBlock('os_start');
    const timer = workspace.newBlock('os_when_timer_tick');
    const interval = workspace.newBlock('os_number'); interval.setFieldValue(250, 'VALUE');
    timer.getInput('INTERVAL').connection.connect(interval.outputConnection);
    const code = cGenerator.workspaceToCode(workspace);
    assert.match(code, /linux_monotonic_ns\(\) \/ 1000000u/);
    assert.match(code, /blockos_now_ms - .* >= \(uint64_t\)\(250\)/);
    assert.equal((code.match(/void blockos_main\(void\)/g) || []).length, 1);
  } finally { workspace.dispose(); }
});

test('Linux ISO patching checks template identity and capacity', () => {
  const template = new Uint8Array(1024).fill(0xa5);
  template.set(new TextEncoder().encode(LINUX_ISO_SIGNATURE), 128);
  const metadata = {format: 'fromscratch-linux-iso-template', version: 1, templateBytes: 1024, initrdOffset: 128, initrdSlotSize: 256};
  const iso = patchLinuxIso(template, metadata, new Uint8Array([1, 2, 3]));
  assert.deepEqual([...iso.slice(128, 132)], [1, 2, 3, 0]);
  assert.equal(iso[127], 0xa5);
  assert.equal(iso[384], 0xa5);
  assert.throws(() => patchLinuxIso(template, {...metadata, initrdOffset: 1000}, new Uint8Array()), /metadata/);
  assert.throws(() => patchLinuxIso(template, metadata, new Uint8Array(257)), /slot/);
  assert.throws(() => patchLinuxIso(new Uint8Array(1024), metadata, new Uint8Array()), /slot is missing/);
});
