import * as Blockly from 'blockly/core';
import {cGenerator} from '../generator/c-generator.js';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'os_set_text_size',
    message0: 'set text size %1',
    args0: [{type: 'field_number', name: 'SIZE', value: 2, min: 1, max: 8, precision: 1}],
    previousStatement: null,
    nextStatement: null,
    colour: 165,
    tooltip: 'Set the pixel font scale used by Print Text. 1 is smallest; 8 is largest.',
    helpUrl: '',
  },
  {
    type: 'os_set_text_colour',
    message0: 'set text colour %1',
    args0: [{type: 'field_input', name: 'COLOUR', text: '#FFFFFF'}],
    previousStatement: null,
    nextStatement: null,
    colour: 165,
    tooltip: 'Set Print Text colour using a six-digit RGB hex colour such as #00FF88.',
    helpUrl: '',
  },
  {
    type: 'os_set_text_font',
    message0: 'set text font %1',
    args0: [{
      type: 'field_dropdown',
      name: 'FONT',
      options: [
        ['Pixel 5x7', '0'],
        ['Bold Pixel', '1'],
        ['Compact Pixel', '2'],
      ],
    }],
    previousStatement: null,
    nextStatement: null,
    colour: 165,
    tooltip: 'Choose the font style used by Print Text.',
    helpUrl: '',
  },
  {
    type: 'os_set_text_location',
    message0: 'set text location %1',
    args0: [{
      type: 'field_dropdown',
      name: 'LOCATION',
      options: [
        ['top left', '0'], ['top centre', '1'], ['top right', '2'],
        ['middle left', '3'], ['centre', '4'], ['middle right', '5'],
        ['bottom left', '6'], ['bottom centre', '7'], ['bottom right', '8'],
      ],
    }],
    previousStatement: null,
    nextStatement: null,
    colour: 165,
    tooltip: 'Choose where Print Text starts drawing. Each new Print Text line advances from this anchor.',
    helpUrl: '',
  },
]);

function addPrototype(generator, prototype) {
  generator.extensionPrototypes_?.add(prototype);
}

cGenerator.forBlock.os_set_text_size = function osSetTextSize(block, generator) {
  addPrototype(generator, 'void blockos_text_set_size(uint32_t size);');
  const size = Math.max(1, Math.min(8, Math.trunc(Number(block.getFieldValue('SIZE')) || 2)));
  return `blockos_text_set_size(${size}u);\n`;
};

cGenerator.forBlock.os_set_text_colour = function osSetTextColour(block, generator) {
  addPrototype(generator, 'void blockos_text_set_colour(uint32_t colour);');
  const raw = String(block.getFieldValue('COLOUR') || '#FFFFFF').trim();
  const hex = /^#[0-9A-Fa-f]{6}$/.test(raw) ? raw.slice(1).toUpperCase() : 'FFFFFF';
  return `blockos_text_set_colour(0x${hex}u);\n`;
};

cGenerator.forBlock.os_set_text_font = function osSetTextFont(block, generator) {
  addPrototype(generator, 'void blockos_text_set_font(uint32_t font);');
  const font = ['0', '1', '2'].includes(block.getFieldValue('FONT')) ? block.getFieldValue('FONT') : '0';
  return `blockos_text_set_font(${font}u);\n`;
};

cGenerator.forBlock.os_set_text_location = function osSetTextLocation(block, generator) {
  addPrototype(generator, 'void blockos_text_set_location(uint32_t location);');
  const location = Math.max(0, Math.min(8, Math.trunc(Number(block.getFieldValue('LOCATION')) || 0)));
  return `blockos_text_set_location(${location}u);\n`;
};

// Make the existing Print Text block use the styled-text renderer, so the four
// setter blocks genuinely configure Print Text rather than a separate preview.
cGenerator.forBlock.os_print_text = function osPrintStyledText(block, generator) {
  addPrototype(generator, 'void blockos_text_print_line(const char *text);');
  const text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '""';
  return `blockos_text_print_line(${text});\n`;
};
