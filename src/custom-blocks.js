import * as Blockly from 'blockly/core';
import {cGenerator} from './generator/c-generator.js';

export const CUSTOM_BLOCK_STORAGE_KEY = 'blockos-custom-block-specs-v1';
export const CUSTOM_FUNCTION_CATEGORY_KEY = 'BLOCKOS_CUSTOM_FUNCTIONS';
export const CREATE_CUSTOM_BLOCK_CALLBACK_KEY = 'BLOCKOS_CREATE_CUSTOM_BLOCK';

const BUILTIN_TYPES = {
  text: {label: 'Text', check: 'String', cType: 'const char *', fallback: '""'},
  number: {label: 'Number', check: 'Number', cType: 'int64_t', fallback: '0'},
  unsigned: {label: 'Unsigned 64-bit', check: 'Number', cType: 'uint64_t', fallback: '0'},
  boolean: {label: 'Boolean', check: 'Boolean', cType: 'bool', fallback: 'false'},
  colour: {label: 'Colour', check: 'Number', cType: 'uint32_t', fallback: '0'},
  pointer: {label: 'Pointer', check: 'Number', cType: 'uintptr_t', fallback: '0'},
};

function sanitizeIdentifier(value, fallback = 'item') {
  const cleaned = String(value ?? '')
    .trim()
    .replace(/[^A-Za-z0-9_]/g, '_')
    .replace(/_+/g, '_');
  const prefixed = /^[A-Za-z_]/.test(cleaned) ? cleaned : `_${cleaned}`;
  return prefixed && prefixed !== '_' ? prefixed : fallback;
}

function makeId() {
  const random = Math.random().toString(36).slice(2, 8);
  return `cb_${Date.now().toString(36)}_${random}`;
}

function normalizeType(raw = {}) {
  const kind = String(raw.kind ?? raw.typeKind ?? 'number');
  if (kind !== 'custom' && BUILTIN_TYPES[kind]) return {kind};
  const customName = String(raw.customName ?? raw.name ?? 'CustomValue').trim() || 'CustomValue';
  return {kind: 'custom', customName, customKey: sanitizeIdentifier(customName, 'custom_value').toLowerCase()};
}

function normalizeArgument(raw, index) {
  const displayName = String(raw.displayName ?? raw.name ?? `argument_${index + 1}`).trim() || `argument_${index + 1}`;
  return {
    displayName,
    cName: sanitizeIdentifier(raw.cName ?? displayName, `argument_${index + 1}`),
    type: normalizeType(raw.type ?? raw),
  };
}

function normalizeSpec(raw) {
  const id = sanitizeIdentifier(raw.id ?? makeId(), makeId());
  const displayName = String(raw.displayName ?? raw.name ?? 'custom block').trim() || 'custom block';
  const suffix = id.replace(/^cb_/, '').slice(-12);
  return {
    id,
    displayName,
    cName: sanitizeIdentifier(raw.cName ?? `blockos_${displayName}_${suffix}`, `blockos_custom_${suffix}`),
    arguments: Array.isArray(raw.arguments) ? raw.arguments.map(normalizeArgument) : [],
  };
}

export function createCustomBlockSpec(displayName, argumentRows) {
  const name = String(displayName ?? '').trim();
  if (!name) throw new Error('Enter a name for the new block.');
  if (!Array.isArray(argumentRows) || argumentRows.length > 8) throw new Error('A custom block can have up to 8 arguments.');

  const spec = normalizeSpec({displayName: name, arguments: argumentRows});
  const used = new Set();
  for (const argument of spec.arguments) {
    if (!argument.displayName) throw new Error('Every argument needs a name.');
    if (used.has(argument.cName)) throw new Error(`Argument name “${argument.displayName}” is duplicated.`);
    used.add(argument.cName);
  }
  return spec;
}

export function loadCustomBlockSpecs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_BLOCK_STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.map(normalizeSpec) : [];
  } catch {
    return [];
  }
}

export function saveCustomBlockSpecs(specs) {
  localStorage.setItem(CUSTOM_BLOCK_STORAGE_KEY, JSON.stringify(specs));
}

export function definitionType(spec) {
  return `os_custom_def_${spec.id}`;
}

export function callType(spec) {
  return `os_custom_call_${spec.id}`;
}

export function argumentType(spec, index) {
  return `os_custom_arg_${spec.id}_${index}`;
}

function customTypeCastType(type) {
  return `os_custom_type_${type.customKey}`;
}

function typeInfo(type) {
  if (type.kind === 'custom') {
    return {
      label: type.customName,
      check: `BlockOSCustom:${type.customKey}`,
      cType: `blockos_type_${type.customKey}`,
      fallback: '0',
    };
  }
  return BUILTIN_TYPES[type.kind] ?? BUILTIN_TYPES.number;
}

function ensureCustomType(generator, type) {
  if (type.kind !== 'custom') return;
  const info = typeInfo(type);
  generator.customTypeDefinitions_.add(`typedef uint64_t ${info.cType}; // custom type: ${type.customName}`);
}

function castCode(type, code) {
  const info = typeInfo(type);
  if (type.kind === 'text') return `(const char *)(${code})`;
  if (type.kind === 'boolean') return `(bool)(${code})`;
  return `(${info.cType})(${code})`;
}

function registerCustomTypeCast(type) {
  if (type.kind !== 'custom') return;
  const blockType = customTypeCastType(type);
  if (!Blockly.Blocks[blockType]) {
    Blockly.Blocks[blockType] = {
      init() {
        this.appendValueInput('VALUE').appendField(`make ${type.customName} from`);
        this.setOutput(true, typeInfo(type).check);
        this.setColour(300);
        this.setTooltip(`Create a ${type.customName} custom-type value from another value. Custom types are represented as 64-bit values in the current runtime.`);
      },
    };
  }
  if (!cGenerator.forBlock[blockType]) {
    cGenerator.forBlock[blockType] = function customTypeCast(block, generator) {
      ensureCustomType(generator, type);
      const value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0';
      return [`(${typeInfo(type).cType})(${value})`, generator.ORDER_ATOMIC];
    };
  }
}

export function registerCustomBlockSpec(specInput) {
  const spec = normalizeSpec(specInput);
  const defBlockType = definitionType(spec);
  const callBlockType = callType(spec);

  for (const argument of spec.arguments) registerCustomTypeCast(argument.type);

  if (!Blockly.Blocks[defBlockType]) {
    Blockly.Blocks[defBlockType] = {
      init() {
        this.appendDummyInput('HEADER').appendField(`define ${spec.displayName}`);
        for (const argument of spec.arguments) {
          this.appendDummyInput().appendField(`${argument.displayName}: ${typeInfo(argument.type).label}`);
        }
        this.appendStatementInput('BODY').appendField('do');
        this.setColour(290);
        this.setTooltip(`Definition of the custom block “${spec.displayName}”. Use its argument reporter blocks inside this body.`);
        this.setDeletable(true);
      },
    };
  }

  if (!Blockly.Blocks[callBlockType]) {
    Blockly.Blocks[callBlockType] = {
      init() {
        this.appendDummyInput('HEADER').appendField(spec.displayName);
        for (let index = 0; index < spec.arguments.length; index += 1) {
          const argument = spec.arguments[index];
          this.appendValueInput(`ARG${index}`)
            .setCheck(typeInfo(argument.type).check)
            .appendField(argument.displayName);
        }
        this.setInputsInline(spec.arguments.length <= 3);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip(`Run the custom block “${spec.displayName}”.`);
      },
    };
  }

  spec.arguments.forEach((argument, index) => {
    const reporterType = argumentType(spec, index);
    if (!Blockly.Blocks[reporterType]) {
      Blockly.Blocks[reporterType] = {
        init() {
          this.appendDummyInput().appendField(`${argument.displayName}`);
          this.setOutput(true, typeInfo(argument.type).check);
          this.setColour(305);
          this.setTooltip(`The ${argument.displayName} argument supplied to “${spec.displayName}”.`);
          this.setOnChange(() => {
            const root = this.getRootBlock();
            this.setWarningText(root?.type === defBlockType ? null : `Use this argument only inside the “${spec.displayName}” definition.`);
          });
        },
      };
    }
    if (!cGenerator.forBlock[reporterType]) {
      cGenerator.forBlock[reporterType] = function customArgumentReporter(block, generator) {
        ensureCustomType(generator, argument.type);
        if (block.getRootBlock()?.type !== defBlockType) return [typeInfo(argument.type).fallback, generator.ORDER_ATOMIC];
        return [argument.cName, generator.ORDER_ATOMIC];
      };
    }
  });

  if (!cGenerator.forBlock[defBlockType]) {
    cGenerator.forBlock[defBlockType] = function customDefinition(block, generator) {
      for (const argument of spec.arguments) ensureCustomType(generator, argument.type);
      const parameters = spec.arguments.length
        ? spec.arguments.map((argument) => `${typeInfo(argument.type).cType} ${argument.cName}`).join(', ')
        : 'void';
      const body = generator.statementToCode(block, 'BODY') || `${generator.INDENT}// Custom block body is empty.\n`;
      generator.functionPrototypes_.add(`static void ${spec.cName}(${parameters});`);
      generator.definitions_[`custom_${spec.id}`] = `static void ${spec.cName}(${parameters}) {\n${body}}`;
      return '';
    };
  }

  if (!cGenerator.forBlock[callBlockType]) {
    cGenerator.forBlock[callBlockType] = function customCall(block, generator) {
      const argumentsCode = spec.arguments.map((argument, index) => {
        ensureCustomType(generator, argument.type);
        const info = typeInfo(argument.type);
        const value = generator.valueToCode(block, `ARG${index}`, generator.ORDER_NONE) || info.fallback;
        return castCode(argument.type, value);
      });
      return `${spec.cName}(${argumentsCode.join(', ')});\n`;
    };
  }

  return spec;
}

export function registerCustomBlockSpecs(specs) {
  for (const spec of specs) registerCustomBlockSpec(spec);
}

export function customFunctionFlyout(specs) {
  const items = [{kind: 'button', text: 'Create a custom block', callbackKey: CREATE_CUSTOM_BLOCK_CALLBACK_KEY}];
  const customTypes = new Map();

  for (const spec of specs) {
    items.push({kind: 'sep', gap: 18});
    items.push({kind: 'block', type: callType(spec)});
    items.push({kind: 'block', type: definitionType(spec)});
    spec.arguments.forEach((argument, index) => {
      items.push({kind: 'block', type: argumentType(spec, index)});
      if (argument.type.kind === 'custom') customTypes.set(argument.type.customKey, argument.type);
    });
  }

  if (customTypes.size) {
    items.push({kind: 'sep', gap: 24});
    for (const type of customTypes.values()) items.push({kind: 'block', type: customTypeCastType(type)});
  }
  return items;
}

export function installCustomFunctionToolbox(workspace, getSpecs, openCreator) {
  workspace.registerButtonCallback(CREATE_CUSTOM_BLOCK_CALLBACK_KEY, openCreator);
  workspace.registerToolboxCategoryCallback(CUSTOM_FUNCTION_CATEGORY_KEY, () => customFunctionFlyout(getSpecs()));
}

export function createDefinitionInWorkspace(workspace, spec) {
  const block = workspace.newBlock(definitionType(spec));
  block.initSvg();
  block.render();
  const offset = workspace.getTopBlocks(false).filter((item) => item.type.startsWith('os_custom_def_')).length * 36;
  block.moveBy(70 + offset, 70 + offset);
  return block;
}

export function removeSpecBlocksFromWorkspace(workspace, spec) {
  const types = new Set([
    definitionType(spec),
    callType(spec),
    ...spec.arguments.map((_argument, index) => argumentType(spec, index)),
  ]);
  for (const block of workspace.getAllBlocks(false)) {
    if (types.has(block.type)) block.dispose(false);
  }
}

export function isCustomDefinitionBlock(block) {
  return block.type.startsWith('os_custom_def_');
}

export function customSpecSummary(spec) {
  if (!spec.arguments.length) return 'No arguments';
  return spec.arguments.map((argument) => `${argument.displayName}: ${typeInfo(argument.type).label}`).join(', ');
}
