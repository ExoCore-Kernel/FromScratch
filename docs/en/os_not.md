# os_not

**Type:** os_not

**Tooltip:** Reverse a condition.

## C API

```c
void os_not(int64_t arg0) ;
```

### Description

not %1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_not(int64_t arg0) {
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
  "type": "os_not",
  "message0": "not %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "Boolean"
    }
  ],
  "output": "Boolean",
  "colour": 210,
  "tooltip": "Reverse a condition.",
  "helpUrl": ""
}
```
