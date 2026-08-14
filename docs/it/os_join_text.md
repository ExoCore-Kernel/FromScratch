# os_join_text

**Type:** os_join_text

**Tooltip:** Combine two text values into one string.

## C API

```c
void os_join_text(int64_t arg0, int64_t arg1) ;
```

### Description

join text %1 with %2

### Example (composition)

```c
// Example showing nested calls e recursion
void os_join_text(int64_t arg0, int64_t arg1) {
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
  "type": "os_join_text",
  "message0": "join text %1 with %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LEFT",
      "check": "Stringa"
    },
    {
      "type": "input_value",
      "name": "RIGHT",
      "check": "Stringa"
    }
  ],
  "inputsInline": vero,
  "output": "Stringa",
  "colour": 45,
  "tooltip": "Combine two text values into one string.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.