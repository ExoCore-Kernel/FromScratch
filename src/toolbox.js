import {extensionCategories} from './blocks/block-catalog.js';

const extensionToolboxCategories = extensionCategories.map((category) => ({
  kind: 'category',
  name: `${category.name} (${category.blocks.length})`,
  colour: String(category.colour),
  contents: category.blocks.map((block) => ({kind: 'block', type: block.type})),
}));

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Kernel basics',
      colour: '275',
      contents: [
        {kind: 'block', type: 'os_start'},
        {kind: 'block', type: 'os_halt'},
        {kind: 'block', type: 'os_wait_interrupt'},
      ],
    },
    {
      kind: 'category',
      name: 'Screen basics',
      colour: '165',
      contents: [
        {kind: 'block', type: 'os_print_text'},
        {kind: 'block', type: 'os_print_number'},
        {kind: 'block', type: 'os_clear_screen'},
        {kind: 'block', type: 'os_set_pixel'},
        {kind: 'block', type: 'os_colour'},
      ],
    },
    {
      kind: 'category',
      name: 'Flow',
      colour: '120',
      contents: [
        {kind: 'block', type: 'os_forever'},
        {kind: 'block', type: 'os_while'},
        {kind: 'block', type: 'os_if'},
        {kind: 'block', type: 'os_repeat'},
      ],
    },
    {
      kind: 'category',
      name: 'Values',
      colour: '45',
      contents: [
        {kind: 'block', type: 'os_text'},
        {kind: 'block', type: 'os_join_text'},
        {kind: 'block', type: 'os_text_equals_ignore_case'},
        {kind: 'block', type: 'os_input_line_available'},
        {kind: 'block', type: 'os_read_input_line'},
        {kind: 'block', type: 'os_number'},
        {kind: 'block', type: 'os_boolean'},
      ],
    },
    {
      kind: 'category',
      name: 'Math & logic',
      colour: '220',
      contents: [
        {kind: 'block', type: 'os_math'},
        {kind: 'block', type: 'os_compare'},
        {kind: 'block', type: 'os_logic'},
        {kind: 'block', type: 'os_not'},
      ],
    },
    {
      kind: 'category',
      name: 'Variables',
      colour: '330',
      contents: [
        {kind: 'block', type: 'os_var_declare'},
        {kind: 'block', type: 'os_var_set'},
        {kind: 'block', type: 'os_var_get'},
      ],
    },
    {
      kind: 'category',
      name: 'Files & dependencies',
      colour: '25',
      contents: [
        {kind: 'block', type: 'os_asset_count'},
        {kind: 'block', type: 'os_asset_name'},
        {kind: 'block', type: 'os_asset_size'},
        {kind: 'block', type: 'os_print_asset_text'},
      ],
    },
    {
      kind: 'category',
      name: 'Custom functions',
      colour: '290',
      custom: 'BLOCKOS_CUSTOM_FUNCTIONS',
    },
    {
      kind: 'category',
      name: 'Hardware basics (unsafe)',
      colour: '10',
      contents: [
        {kind: 'block', type: 'os_port_read8'},
        {kind: 'block', type: 'os_port_write8'},
      ],
    },
    ...extensionToolboxCategories,
    {
      kind: 'category',
      name: 'Notes',
      colour: '60',
      contents: [{kind: 'block', type: 'os_comment'}],
    },
  ],
};
