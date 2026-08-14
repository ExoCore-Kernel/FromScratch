# os_function_call

**Type:** os_function_call

**Tooltip:** Run a reusable custom blocco.

## C API

```c
void os_function_call(uint64_t arg0) ;
```

### Description

run custom blocco %1

### Example (composition)

```c
// Example showing nested calls e recursion
void os_function_call(uint64_t arg0) {
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
  "type": "os_function_call",
  "message0": "run custom blocco %1",
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
  "tooltip": "Run a reusable custom blocco.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.