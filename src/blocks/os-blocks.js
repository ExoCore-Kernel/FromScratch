import * as BlocklyModule from 'blockly/core';
import {extensionBlocks} from './block-catalog.js';
const Blockly = 'defineBlocksWithJsonArray' in BlocklyModule ? BlocklyModule : Reflect.get(BlocklyModule, 'default');
// The + button is an accessible, clickable Blockly image field.
const PLUS_ICON = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">'
  + '<rect x="1" y="1" width="20" height="20" rx="5" fill="#ffffff" fill-opacity=".22"/>'
  + '<path d="M11 5v12M5 11h12" stroke="white" stroke-width="2.4" stroke-linecap="round"/>'
  + '</svg>',
);

function showTextPartMenu(field) {
  const block = field.getSourceBlock();
  if (!block || !block.isEditable() || block.isInFlyout) return;

  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  const panel = Blockly.DropDownDiv.getContentDiv();
  panel.setAttribute('role', 'group');
  panel.setAttribute('aria-label', 'Add text component');
  for (const [label, type] of [['Add value (number or variable)', 'VALUE'], ['Add string (typed text)', 'STRING']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.style.cssText = 'display:block;width:100%;padding:10px 12px;border:0;'
      + 'background:transparent;color:#111827;text-align:left;cursor:pointer;font:600 13px system-ui;';
    button.addEventListener('click', () => {
      Blockly.DropDownDiv.hideWithoutAnimation();
      block.addTextPart(type);
    });
    panel.appendChild(button);
  }
  if (block.textParts_.length) {
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remove last part';
    remove.style.cssText = 'display:block;width:100%;padding:10px 12px;border:0;'
      + 'background:transparent;color:#b91c1c;text-align:left;cursor:pointer;font:600 13px system-ui;';
    remove.addEventListener('click', () => {
      Blockly.DropDownDiv.hideWithoutAnimation();
      block.removeLastTextPart();
    });
    panel.appendChild(remove);
  }
  Blockly.DropDownDiv.setColour('#f8fafc', '#cbd5e1');
  Blockly.DropDownDiv.showPositionedByField(field, () => {});
}


export function registerOsBlocks() {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'os_start',
      message0: 'when kernel starts %1',
      args0: [{type: 'input_statement', name: 'BODY'}],
      colour: 275,
      tooltip: 'The entry point of the generated kernel.',
      helpUrl: '',
    },
    {
      type: 'os_print_text',
      message0: 'print text %1',
      args0: [{type: 'input_value', name: 'TEXT', check: 'String'}],
      previousStatement: null,
      nextStatement: null,
      colour: 165,
      tooltip: 'Print text using the kernel screen runtime.',
      helpUrl: '',
    },
    {
      type: 'os_print_number',
      message0: 'print number %1',
      args0: [{type: 'input_value', name: 'VALUE', check: 'Number'}],
      previousStatement: null,
      nextStatement: null,
      colour: 165,
      tooltip: 'Print a signed integer.',
      helpUrl: '',
    },
    {
      type: 'os_clear_screen',
      message0: 'clear screen with colour %1',
      args0: [{type: 'input_value', name: 'COLOUR', check: 'Number'}],
      previousStatement: null,
      nextStatement: null,
      colour: 165,
      tooltip: 'Fill the framebuffer with one colour.',
      helpUrl: '',
    },
    {
      type: 'os_set_pixel',
      message0: 'set pixel x %1 y %2 colour %3',
      args0: [
        {type: 'input_value', name: 'X', check: 'Number'},
        {type: 'input_value', name: 'Y', check: 'Number'},
        {type: 'input_value', name: 'COLOUR', check: 'Number'},
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: 165,
      tooltip: 'Set one framebuffer pixel.',
      helpUrl: '',
    },
    {
      type: 'os_colour',
      message0: 'colour %1',
      args0: [{type: 'field_input', name: 'COLOUR', text: '#2563eb'}],
      output: 'Number',
      colour: 165,
      tooltip: 'A 24-bit RGB colour value.',
      helpUrl: '',
    },
    {
      type: 'os_forever',
      message0: 'forever %1',
      args0: [{type: 'input_statement', name: 'BODY'}],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
      tooltip: 'Repeat these blocks forever.',
      helpUrl: '',
    },
    {
      type: 'os_while',
      message0: 'while %1 do %2',
      args0: [
        {type: 'input_value', name: 'CONDITION', check: 'Boolean'},
        {type: 'input_statement', name: 'BODY'},
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
      tooltip: 'Repeat while a condition is true.',
      helpUrl: '',
    },
    {
      type: 'os_if',
      message0: 'if %1 then %2',
      args0: [
        {type: 'input_value', name: 'CONDITION', check: 'Boolean'},
        {type: 'input_statement', name: 'BODY'},
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
      tooltip: 'Run blocks only when the condition is true.',
      helpUrl: '',
    },
    {
      type: 'os_repeat',
      message0: 'repeat %1 times %2',
      args0: [
        {type: 'input_value', name: 'COUNT', check: 'Number'},
        {type: 'input_statement', name: 'BODY'},
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
      tooltip: 'Repeat a fixed number of times.',
      helpUrl: '',
    },
    {
      type: 'os_text',
      message0: 'text %1',
      args0: [{type: 'field_input', name: 'TEXT', text: 'Hello from BlockOS!'}],
      output: 'String',
      colour: 45,
      tooltip: 'A text value.',
      helpUrl: '',
    },
    {
      type: 'os_text_with_value',
      message0: 'text %1 value %2 then text %3',
      args0: [
        {type: 'field_input', name: 'TEXT', text: '1 + 1 is: '},
        {type: 'input_value', name: 'VALUE'},
        {type: 'field_input', name: 'SUFFIX', text: ''},
      ],
      inputsInline: true,
      output: 'String',
      colour: 45,
      tooltip: 'Insert a calculation, numeric variable or text variable directly into a message.',
      helpUrl: '',
    },
    {
      type: 'os_join_text',
      message0: 'join text %1 with %2',
      args0: [
        {type: 'input_value', name: 'LEFT'},
        {type: 'input_value', name: 'RIGHT'},
      ],
      inputsInline: true,
      output: 'String',
      colour: 45,
      tooltip: 'Combine two text values into one string.',
      helpUrl: '',
    },
    {
      type: 'os_input_line_available',
      message0: 'input command line available',
      output: 'Boolean',
      colour: 185,
      tooltip: 'True after the Run input box sends a complete line ending in Enter.',
      helpUrl: '',
    },
    {
      type: 'os_read_input_line',
      message0: 'read input command line',
      output: 'String',
      colour: 185,
      tooltip: 'Read one complete line sent through the Run input box.',
      helpUrl: '',
    },
    {
      type: 'os_text_equals_ignore_case',
      message0: 'text %1 equals %2 ignoring case',
      args0: [
        {type: 'input_value', name: 'LEFT', check: 'String'},
        {type: 'input_value', name: 'RIGHT', check: 'String'},
      ],
      inputsInline: true,
      output: 'Boolean',
      colour: 45,
      tooltip: 'Compare two text values without caring about upper- or lower-case letters.',
      helpUrl: '',
    },
    {
      type: 'os_number',
      message0: 'number %1',
      args0: [{type: 'field_number', name: 'VALUE', value: 0}],
      output: 'Number',
      colour: 230,
      tooltip: 'A number value.',
      helpUrl: '',
    },
    {
      type: 'os_boolean',
      message0: '%1',
      args0: [{
        type: 'field_dropdown',
        name: 'VALUE',
        options: [['true', 'TRUE'], ['false', 'FALSE']],
      }],
      output: 'Boolean',
      colour: 210,
      tooltip: 'A true or false value.',
      helpUrl: '',
    },
    {
      type: 'os_math',
      message0: '%1 %2 %3',
      args0: [
        {type: 'input_value', name: 'A', check: 'Number'},
        {
          type: 'field_dropdown',
          name: 'OP',
          options: [['+', 'ADD'], ['−', 'SUBTRACT'], ['×', 'MULTIPLY'], ['÷', 'DIVIDE'], ['remainder', 'MODULO']],
        },
        {type: 'input_value', name: 'B', check: 'Number'},
      ],
      inputsInline: true,
      output: 'Number',
      colour: 230,
      tooltip: 'Arithmetic expression.',
      helpUrl: '',
    },
    {
      type: 'os_compare',
      message0: '%1 %2 %3',
      args0: [
        {type: 'input_value', name: 'A'},
        {
          type: 'field_dropdown',
          name: 'OP',
          options: [['=', 'EQ'], ['≠', 'NEQ'], ['<', 'LT'], ['≤', 'LTE'], ['>', 'GT'], ['≥', 'GTE']],
        },
        {type: 'input_value', name: 'B'},
      ],
      inputsInline: true,
      output: 'Boolean',
      colour: 210,
      tooltip: 'Compare two values.',
      helpUrl: '',
    },
    {
      type: 'os_logic',
      message0: '%1 %2 %3',
      args0: [
        {type: 'input_value', name: 'A', check: 'Boolean'},
        {type: 'field_dropdown', name: 'OP', options: [['and', 'AND'], ['or', 'OR']]},
        {type: 'input_value', name: 'B', check: 'Boolean'},
      ],
      inputsInline: true,
      output: 'Boolean',
      colour: 210,
      tooltip: 'Combine conditions.',
      helpUrl: '',
    },
    {
      type: 'os_not',
      message0: 'not %1',
      args0: [{type: 'input_value', name: 'VALUE', check: 'Boolean'}],
      output: 'Boolean',
      colour: 210,
      tooltip: 'Reverse a condition.',
      helpUrl: '',
    },
    {
      type: 'os_var_declare',
      message0: 'create %1 variable %2 starting at %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'TYPE',
          options: [
            ['8-bit unsigned', 'uint8_t'],
            ['16-bit unsigned', 'uint16_t'],
            ['32-bit unsigned', 'uint32_t'],
            ['64-bit unsigned', 'uint64_t'],
            ['32-bit signed', 'int32_t'],
            ['64-bit signed', 'int64_t'],
            ['boolean', 'bool'],
            ['text', 'const char *'],
          ],
        },
        {type: 'field_input', name: 'NAME', text: 'counter'},
        {type: 'input_value', name: 'VALUE'},
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 330,
      tooltip: 'Create a local C variable.',
      helpUrl: '',
    },
    {
      type: 'os_var_set',
      message0: 'set variable %1 to %2',
      args0: [
        {type: 'field_input', name: 'NAME', text: 'counter'},
        {type: 'input_value', name: 'VALUE'},
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 330,
      tooltip: 'Change an existing variable.',
      helpUrl: '',
    },
    {
      type: 'os_var_get',
      message0: 'variable %1',
      args0: [{type: 'field_input', name: 'NAME', text: 'counter'}],
      output: null,
      colour: 330,
      tooltip: 'Read a variable value.',
      helpUrl: '',
    },
    {
      type: 'os_port_read8',
      message0: 'read 8-bit hardware port %1',
      args0: [{type: 'input_value', name: 'PORT', check: 'Number'}],
      output: 'Number',
      colour: 10,
      tooltip: 'Read an x86 I/O port. This is architecture-specific and unsafe.',
      helpUrl: '',
    },
    {
      type: 'os_port_write8',
      message0: 'write 8-bit value %1 to hardware port %2',
      args0: [
        {type: 'input_value', name: 'VALUE', check: 'Number'},
        {type: 'input_value', name: 'PORT', check: 'Number'},
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 10,
      tooltip: 'Write an x86 I/O port. This is architecture-specific and unsafe.',
      helpUrl: '',
    },
    {
      type: 'os_halt',
      message0: 'halt CPU',
      previousStatement: null,
      nextStatement: null,
      colour: 10,
      tooltip: 'Stop the CPU until it is reset.',
      helpUrl: '',
    },
    {
      type: 'os_wait_interrupt',
      message0: 'wait for next interrupt',
      previousStatement: null,
      nextStatement: null,
      colour: 10,
      tooltip: 'Pause the CPU until an interrupt arrives.',
      helpUrl: '',
    },
    {
      type: 'os_asset_count',
      message0: 'uploaded file count',
      output: 'Number',
      colour: 25,
      tooltip: 'Number of files embedded into the bootable ISO.',
      helpUrl: '',
    },
    {
      type: 'os_asset_name',
      message0: 'uploaded file name at index %1',
      args0: [{type: 'input_value', name: 'INDEX', check: 'Number'}],
      output: 'String',
      colour: 25,
      tooltip: 'Read an uploaded file name.',
      helpUrl: '',
    },
    {
      type: 'os_asset_size',
      message0: 'uploaded file size at index %1',
      args0: [{type: 'input_value', name: 'INDEX', check: 'Number'}],
      output: 'Number',
      colour: 25,
      tooltip: 'Read an uploaded file size in bytes.',
      helpUrl: '',
    },
    {
      type: 'os_print_asset_text',
      message0: 'print uploaded text file at index %1',
      args0: [{type: 'input_value', name: 'INDEX', check: 'Number'}],
      previousStatement: null,
      nextStatement: null,
      colour: 25,
      tooltip: 'Print an uploaded text file from the ISO.',
      helpUrl: '',
    },
    {
      type: 'os_function_def',
      message0: 'define custom block %1 %2',
      args0: [
        {type: 'field_input', name: 'NAME', text: 'my_block'},
        {type: 'input_statement', name: 'BODY'},
      ],
      colour: 290,
      tooltip: 'Define a reusable custom block with no inputs yet.',
      helpUrl: '',
    },
    {
      type: 'os_function_call',
      message0: 'run custom block %1',
      args0: [{type: 'field_input', name: 'NAME', text: 'my_block'}],
      previousStatement: null,
      nextStatement: null,
      colour: 290,
      tooltip: 'Run a reusable custom block.',
      helpUrl: '',
    },
    {
      type: 'os_comment',
      message0: 'note %1',
      args0: [{type: 'field_input', name: 'TEXT', text: 'Explain this part'}],
      previousStatement: null,
      nextStatement: null,
      colour: 60,
      tooltip: 'Add a C comment.',
      helpUrl: '',
    },
  ]);

  // Replaces only the Text block's shape; existing saved TEXT fields still load.
  Blockly.Blocks.os_text = {
    init() {
      this.textParts_ = [];
      this.appendDummyInput('BASE')
        .appendField('text')
        .appendField(new Blockly.FieldTextInput('Hello from BlockOS!'), 'TEXT');
      this.appendDummyInput('ADD').appendField(
        new Blockly.FieldImage(PLUS_ICON, 20, 20, 'Add a string or value', function () {
          showTextPartMenu(this);
        }),
        'PLUS',
      );
      this.setInputsInline(true);
      this.setOutput(true, 'String');
      this.setColour(45);
      this.setTooltip('Text can include any number of typed strings, calculations and variables. Press + to add a part.');
    },
    appendTextPart_(type) {
      const index = this.textParts_.length;
      this.textParts_.push(type);
      if (type === 'VALUE') {
        this.appendValueInput('PART_' + index).appendField('value');
      } else {
        this.appendDummyInput('PART_' + index)
          .appendField('text')
          .appendField(new Blockly.FieldTextInput(''), 'TEXT_' + index);
      }
      this.moveInputBefore('PART_' + index, 'ADD');
      if (this.rendered) this.render();
    },
    addTextPart(type) {
      if (type !== 'VALUE' && type !== 'STRING') return;
      this.changeTextParts_(() => this.appendTextPart_(type));
    },
    removeLastTextPart() {
      if (!this.textParts_.length) return;
      this.changeTextParts_(() => {
        const index = this.textParts_.length - 1;
        this.removeInput('PART_' + index);
        this.textParts_.pop();
        if (this.rendered) this.render();
      });
    },
    changeTextParts_(update) {
      const group = Blockly.Events.getGroup();
      if (!group) Blockly.Events.setGroup(true);
      try {
        const before = JSON.stringify(this.saveExtraState());
        update();
        const after = JSON.stringify(this.saveExtraState());
        if (before !== after && Blockly.Events.isEnabled()) {
          const Change = Blockly.Events.get(Blockly.Events.BLOCK_CHANGE);
          Blockly.Events.fire(new Change(this, 'mutation', null, before, after));
        }
      } finally {
        Blockly.Events.setGroup(group);
      }
    },
    saveExtraState() {
      return this.textParts_.length ? {parts: [...this.textParts_]} : null;
    },
    loadExtraState(state) {
      const parts = Array.isArray(state?.parts)
        ? state.parts.filter(type => type === 'VALUE' || type === 'STRING')
        : [];
      let shared = 0;
      while (shared < this.textParts_.length && shared < parts.length
        && this.textParts_[shared] === parts[shared]) ++shared;
      for (let i = this.textParts_.length - 1; i >= shared; --i) {
        this.removeInput('PART_' + i);
      }
      this.textParts_.length = shared;
      for (const type of parts.slice(shared)) this.appendTextPart_(type);
      if (this.rendered) this.render();
    },
  };

  const extensionDefinitions = extensionBlocks.map((spec) => {
    const args0 = spec.args.map((argument, index) => ({
      type: 'input_value',
      name: `ARG${index}`,
      check: argument.type,
    }));
    const message0 = [spec.label, ...spec.args.map((argument, index) => `${argument.name} %${index + 1}`)].join(' ');
    const definition = {
      type: spec.type,
      message0,
      args0,
      inputsInline: spec.args.length <= 4,
      colour: spec.colour,
      tooltip: `${spec.category}: ${spec.label}. This block compiles into the BlockOS x86_64 runtime capability layer.`,
      helpUrl: '',
    };

    if (spec.kind === 'cmd') {
      definition.previousStatement = null;
      definition.nextStatement = null;
    } else {
      definition.output = spec.kind === 'num' ? 'Number' : spec.kind === 'bool' ? 'Boolean' : 'String';
    }
    return definition;
  });

  Blockly.defineBlocksWithJsonArray(extensionDefinitions);
}
