# os_var_get

**Type:** os_var_get

**Tooltip:** Read a variable value.

## C API

```c
void os_var_get(uint64_t arg0) ;
```

### Description

variable %1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_var_get(uint64_t arg0) {
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
  "type": "os_var_get",
  "message0": "variable %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "counter"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "Read a variable value.",
  "helpUrl": ""
}
```
