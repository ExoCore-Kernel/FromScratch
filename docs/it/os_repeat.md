# os_repeat

**Type:** os_repeat

**Tooltip:** Ripeti a fixed number of times.

## C API

```c
void os_repeat(int64_t arg0, uint64_t arg1) ;
```

### Description

ripeti %1 times %2

### Example (composition)

```c
// Example showing nested calls e recursion
void os_repeat(int64_t arg0, uint64_t arg1) {
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
  "type": "os_repeat",
  "message0": "ripeti %1 times %2",
  "args0": [
    {
      "type": "input_value",
      "name": "COUNT",
      "check": "Numero"
    },
    {
      "type": "input_statement",
      "name": "BODY"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "Ripeti a fixed number of times.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.