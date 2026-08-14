# os_function_call

**Type:** os_function_call

**Tooltip:** Run a reusable custom block.

## C API

```c
void os_function_call(uint64_t arg0) ;
```

### Description

run custom block %1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_function_call(uint64_t arg0) {
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
  "type": "os_function_call",
  "message0": "run custom block %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "my_block"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 290,
  "tooltip": "Run a reusable custom block.",
  "helpUrl": ""
}
```
