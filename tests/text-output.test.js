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
        '--target=x86_64-unknown-none-elf', '-m64', '-ffreestanding',
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
