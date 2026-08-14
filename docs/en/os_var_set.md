# os_var_set

**Type:** os_var_set

**Tooltip:** Change an existing variable.

## C API

```c
void os_var_set(uint64_t arg0, int64_t arg1) ;
```

### Description

set variable %1 to %2

### Example (composition)

```c
// Example showing nested calls and recursion
void os_var_set(uint64_t arg0, int64_t arg1) {
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
  "type": "os_var_set",
  "message0": "set variable %1 to %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "counter"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Change an existing variable.",
  "helpUrl": ""
}
```
