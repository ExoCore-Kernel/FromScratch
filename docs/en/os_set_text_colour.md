# os_set_text_colour

**Type:** os_set_text_colour

**Tooltip:** Set Print Text colour using a six-digit RGB hex colour such as #00FF88.

## C API

```c
void os_set_text_colour(uint64_t arg0) ;
```

### Description

set text colour %1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_set_text_colour(uint64_t arg0) {
    // body generated from connected blocks
}

static void run_sequence(void) {
    // call generated block functions
}
```

## References (kernel files)

- [boot.S](../kernel/boot.S)
- [extensions_runtime.c](../kernel/extensions_runtime.c)
- [runtime.c](../kernel/runtime.c)
- [text_style_runtime.c](../kernel/text_style_runtime.c)

## JSON Definition

```json
{
  "type": "os_set_text_colour",
  "message0": "set text colour %1",
  "args0": [
    {
      "type": "field_input",
      "name": "COLOUR",
      "text": "#FFFFFF"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Set Print Text colour using a six-digit RGB hex colour such as #00FF88.",
  "helpUrl": ""
}
```
