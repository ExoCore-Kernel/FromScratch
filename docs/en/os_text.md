# os_text

**Type:** os_text

**Tooltip:** A text value.

## C API

```c
void os_text(uint64_t arg0) ;
```

### Description

text %1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_text(uint64_t arg0) {
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
  "type": "os_text",
  "message0": "text %1",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": "Hello from BlockOS!"
    }
  ],
  "output": "String",
  "colour": 45,
  "tooltip": "A text value.",
  "helpUrl": ""
}
```
