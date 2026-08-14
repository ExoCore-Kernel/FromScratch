# os_forever

**Type:** os_forever

**Tooltip:** Ripeti questi blocchi all'infinito.

## C API

```c
void os_forever(uint64_t arg0) ;
```

### Description

forever %1

### Example (composition)

```c
// Example showing nested calls e recursion
void os_forever(uint64_t arg0) {
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
  "type": "os_forever",
  "message0": "forever %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "BODY"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "Ripeti questi blocchi all'infinito.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.