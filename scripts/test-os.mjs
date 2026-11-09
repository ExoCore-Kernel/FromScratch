import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import Blockly from 'blockly/core';
import {registerOsBlocks} from '../src/blocks/os-blocks.js';
import {cGenerator} from '../src/generator/c-generator.js';
import {parsePsf} from '../src/bitmap-font.js';
import {buildKernelImage} from './build-os.mjs';

const build = new URL('../build/test-os/', import.meta.url);
const projectUrl = new URL('../public/examples/hello-test.blockos-project.json', import.meta.url);
const assemblyIndex = process.argv.indexOf('--assembly');
const assembly = assemblyIndex < 0 ? null : process.argv[assemblyIndex + 1];
const fontIndex = process.argv.indexOf('--font');
if (fontIndex >= 0) cGenerator.bitmapFont = parsePsf(await readFile(process.argv[fontIndex + 1])).bytes;
if (assemblyIndex >= 0 && !assembly) throw new Error('--assembly needs a filename');

await mkdir(build, {recursive: true});
registerOsBlocks();
const workspace = new Blockly.Workspace();
const project = JSON.parse(await readFile(projectUrl, 'utf8'));
if (fontIndex >= 0) project.font = {name: 'Test bitmap font', dataBase64: Buffer.from(cGenerator.bitmapFont).toString('base64')};
Blockly.serialization.workspaces.load(project.workspace, workspace);
const source = cGenerator.workspaceToCode(workspace);
workspace.dispose();
await writeFile(new URL('kernel.c', build), source);
await writeFile(new URL('hello-test.blockos-project.json', build), JSON.stringify(project, null, 2) + '\n');
const {iso} = await buildKernelImage({source, assembly, directory: fileURLToPath(build)});
console.log(`Built ${iso}${assembly ? ' from browser-compiled assembly' : ''}`);

const serial = await new Promise((resolve, reject) => {
  const child = spawn('qemu-system-x86_64', [
    '-accel', 'tcg', '-cpu', 'qemu64', '-m', '128M', '-cdrom', iso, '-boot', 'd',
    '-display', 'none', '-serial', 'stdio', '-monitor', 'none', '-no-reboot', '-nic', 'none',
  ]);
  let output = '';
  let errors = '';
  let passed = false;
  const timer = setTimeout(() => child.kill('SIGTERM'), 20000);
  child.stdout.on('data', chunk => {
    output += chunk;
    if (!passed && output.includes('PASS: arithmetic and output work.')) {
      passed = true;
      child.kill('SIGTERM');
    }
  });
  child.stderr.on('data', chunk => { errors += chunk; });
  child.on('error', error => { clearTimeout(timer); reject(error); });
  child.on('exit', () => {
    clearTimeout(timer);
    if (passed) resolve(output);
    else reject(new Error(`Test OS did not boot successfully:\n${output}\n${errors}`));
  });
});
await writeFile(new URL('serial.log', build), serial);
assert.match(serial, /\[BlockOS x86_64\] boot successful/);
assert.match(serial, /FromScratch Test OS/);
if (fontIndex >= 0) assert.match(serial, /custom bitmap font loaded/);
assert.match(serial, /42\s+PASS: arithmetic and output work\./);
console.log(serial.replace(/\x1b\[[0-9;]*[A-Za-z]/g, ''));
console.log('PASS: generated project compiled, linked, and booted in x86_64 QEMU');
