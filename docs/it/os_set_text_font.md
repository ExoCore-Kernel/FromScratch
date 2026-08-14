# os_set_text_font

**Type:** os_set_text_font

**Tooltip:** Choose the font style used by Print Text.

## C API

```c
void os_set_text_font(uint64_t arg0) ;
```

### Description

set text font %1

### Example (composition)

```c
// Example showing nested calls e recursion
void os_set_text_font(uint64_t arg0) {
    // body generated from connected blocchi
}

static void run_sequence(void) {
    // call generated blocco functions
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
  "type": "os_set_text_font",
  "message0": "set text font %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "FONT",
      "options": [
        [
          "Pixel 5x7",
          "0"
        ],
        [
          "Bold Pixel",
          "1"
        ],
        [
          "Compact Pixel",
          "2"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Choose the font style used by Print Text.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.