# os_while

**Type:** os_while

**Tooltip:** Ripeti finché una condizione è vera.

## C API

```c
void os_while(int64_t arg0, uint64_t arg1) ;
```

### Description

while %1 do %2

### Example (composition)

```c
// Example showing nested calls e recursion
void os_while(int64_t arg0, uint64_t arg1) {
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
  "type": "os_while",
  "message0": "while %1 do %2",
  "args0": [
    {
      "type": "input_value",
      "name": "CONDITION",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "BODY"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "Ripeti finché una condizione è vera.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.