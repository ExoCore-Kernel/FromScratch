# os_set_text_size

**Type:** os_set_text_size

**Tooltip:** Set the pixel font scale used by Print Text. 1 is smallest; 8 is largest.

## C API

```c
void os_set_text_size(uint64_t arg0) ;
```

### Description

set text size %1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_set_text_size(uint64_t arg0) {
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
  "type": "os_set_text_size",
  "message0": "set text size %1",
  "args0": [
    {
      "type": "field_number",
      "name": "SIZE",
      "value": 2,
      "min": 1,
      "max": 8,
      "precision": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Set the pixel font scale used by Print Text. 1 is smallest; 8 is largest.",
  "helpUrl": ""
}
```
