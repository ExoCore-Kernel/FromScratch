# os_if

**Type:** os_if

**Tooltip:** Esegui i blocchi solo quando la condizione è vera.

## C API

```c
void os_if(int64_t arg0, uint64_t arg1) ;
```

### Description

se %1 then %2

### Example (composition)

```c
// Example showing nested calls e recursion
void os_if(int64_t arg0, uint64_t arg1) {
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
  "type": "os_if",
  "message0": "se %1 then %2",
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
  "tooltip": "Esegui i blocchi solo quando la condizione è vera.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.