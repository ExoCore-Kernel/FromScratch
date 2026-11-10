import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import Blockly from 'blockly/core';
import {registerOsBlocks} from '../src/blocks/os-blocks.js';
import '../src/blocks/text-style-blocks.js';
import {cGenerator} from '../src/generator/c-generator.js';

registerOsBlocks();

function plug(parent, input, child) {
  parent.getInput(input).connection.connect(child.outputConnection);
}

test('text blocks interpolate calculations and variables into one styled line', async () => {
  const workspace = new Blockly.Workspace();
  try {
    const start = workspace.newBlock('os_start');
    const declaration = workspace.newBlock('os_var_declare');
    declaration.setFieldValue('const char *', 'TYPE');
    declaration.setFieldValue('greeting', 'NAME');
    const greeting = workspace.newBlock('os_text');
    greeting.setFieldValue('Hello!', 'TEXT');
    plug(declaration, 'VALUE', greeting);
    start.getInput('BODY').connection.connect(declaration.previousConnection);

    const numberLine = workspace.newBlock('os_print_text');
    declaration.nextConnection.connect(numberLine.previousConnection);
    const formatted = workspace.newBlock('os_text_with_value');
    formatted.setFieldValue('1 + 1 is: ', 'TEXT');
    plug(numberLine, 'TEXT', formatted);
    const addition = workspace.newBlock('os_math');
    const one = workspace.newBlock('os_number');
    const otherOne = workspace.newBlock('os_number');
    one.setFieldValue(1, 'VALUE');
    otherOne.setFieldValue(1, 'VALUE');
    plug(addition, 'A', one);
    plug(addition, 'B', otherOne);
    plug(formatted, 'VALUE', addition);

    const stringLine = workspace.newBlock('os_print_text');
    numberLine.nextConnection.connect(stringLine.previousConnection);
    const stringFormatted = workspace.newBlock('os_text_with_value');
    stringFormatted.setFieldValue('Message: ', 'TEXT');
    plug(stringLine, 'TEXT', stringFormatted);
    const variable = workspace.newBlock('os_var_get');
    variable.setFieldValue('greeting', 'NAME');
    plug(stringFormatted, 'VALUE', variable);

    const printNumber = workspace.newBlock('os_print_number');
    stringLine.nextConnection.connect(printNumber.previousConnection);
    const two = workspace.newBlock('os_number');
    two.setFieldValue(2, 'VALUE');
    plug(printNumber, 'VALUE', two);

    const source = cGenerator.workspaceToCode(workspace);
    assert.match(source, /blockos_string_join\("1 \+ 1 is: ", _Generic/);
    assert.match(source, /blockos_string_join\("Message: ", _Generic/);
    assert.match(source, /blockos_text_print_number\(\(int64_t\)\(2\)\)/);

    const directory = await mkdtemp(join(tmpdir(), 'blockos-text-'));
    try {
      const root = fileURLToPath(new URL('../', import.meta.url));
      const result = spawnSync('clang', [
        '--target=x86_64-linux-gnu', '-m64', '-ffreestanding',
        '-fno-builtin', '-nostdinc', '-Ikernel/include',
        '-Wall', '-Wextra', '-Werror=implicit-function-declaration',
        '-x', 'c', '-c', '-', '-o', join(directory, 'generated.o'),
      ], {cwd: root, input: source, encoding: 'utf8'});
      if (result.error) throw result.error;
      assert.equal(result.status, 0, result.stderr || result.stdout);
    } finally {
      await rm(directory, {recursive: true, force: true});
    }
  } finally {
    workspace.dispose();
  }
});

test('normal Text block adds any number of ordered string and value parts and survives save/load', async () => {
  const workspace = new Blockly.Workspace();
  const restored = new Blockly.Workspace();
  try {
    const start = workspace.newBlock('os_start');
    const print = workspace.newBlock('os_print_text');
    start.getInput('BODY').connection.connect(print.previousConnection);
    const text = workspace.newBlock('os_text');
    text.setFieldValue('1 + 1 is: ', 'TEXT');
    plug(print, 'TEXT', text);

    // A single text block now works as a mixed sequence of text and values.
    const kinds = ['VALUE', 'STRING', 'VALUE', 'STRING', 'VALUE', 'STRING', 'VALUE'];
    for (const kind of kinds) text.addTextPart(kind);
    const math = workspace.newBlock('os_math');
    const one = workspace.newBlock('os_number');
    const anotherOne = workspace.newBlock('os_number');
    one.setFieldValue(1, 'VALUE');
    anotherOne.setFieldValue(1, 'VALUE');
    plug(math, 'A', one);
    plug(math, 'B', anotherOne);
    plug(text, 'PART_0', math);
    text.setFieldValue(' | sum again: ', 'TEXT_1');
    const number = workspace.newBlock('os_number');
    number.setFieldValue(14, 'VALUE');
    plug(text, 'PART_2', number);
    text.setFieldValue(' | name: ', 'TEXT_3');
    const name = workspace.newBlock('os_text');
    name.setFieldValue('BlockOS', 'TEXT');
    plug(text, 'PART_4', name);
    text.setFieldValue(' | end: ', 'TEXT_5');
    const last = workspace.newBlock('os_number');
    last.setFieldValue(-7, 'VALUE');
    plug(text, 'PART_6', last);

    assert.ok(text.getField('PLUS'), 'the normal Text block should expose its plus button');
    assert.deepEqual(text.saveExtraState().parts, kinds);
    const saved = Blockly.serialization.workspaces.save(workspace);
    Blockly.serialization.workspaces.load(saved, restored);
    const copy = restored.getAllBlocks(false).find(block => block.type === 'os_text' && block.getFieldValue('TEXT') === '1 + 1 is: ');
    assert.ok(copy, 'restored Text block was missing');
    assert.deepEqual(copy.textParts_, kinds);
    assert.equal(copy.getFieldValue('TEXT_1'), ' | sum again: ');
    assert.equal(copy.getFieldValue('TEXT_3'), ' | name: ');
    assert.equal(copy.getInputTargetBlock('PART_0')?.type, 'os_math');
    assert.equal(copy.getInputTargetBlock('PART_4')?.type, 'os_text');

    const source = cGenerator.workspaceToCode(restored);
    assert.match(source, /blockos_string_join\("1 \+ 1 is: ", _Generic/);
    assert.match(source, /" \| sum again: "/);
    assert.match(source, /" \| name: "/);
    assert.match(source, /" \| end: "/);
    const kernelBody = source.slice(source.indexOf('void blockos_main(void)'));
    assert.equal((kernelBody.match(/blockos_string_join\(/g) ?? []).length, kinds.length);

    const directory = await mkdtemp(join(tmpdir(), 'blockos-parts-'));
    try {
      const root = fileURLToPath(new URL('../', import.meta.url));
      const result = spawnSync('clang', [
        '--target=x86_64-linux-gnu', '-m64', '-ffreestanding',
        '-fno-builtin', '-nostdinc', '-Ikernel/include',
        '-Wall', '-Wextra', '-Werror=implicit-function-declaration',
        '-x', 'c', '-c', '-', '-o', join(directory, 'generated.o'),
      ], {cwd: root, input: source, encoding: 'utf8'});
      if (result.error) throw result.error;
      assert.equal(result.status, 0, result.stderr || result.stdout);
    } finally {
      await rm(directory, {recursive: true, force: true});
    }

    // Removing a part and adding more should not lose prior typed strings.
    copy.removeLastTextPart();
    assert.equal(copy.textParts_.length, kinds.length - 1);
    copy.addTextPart('VALUE');
    assert.equal(copy.getFieldValue('TEXT_1'), ' | sum again: ');
  } finally {
    restored.dispose();
    workspace.dispose();
  }
});
