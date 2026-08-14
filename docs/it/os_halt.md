# os_halt

**Type:** os_halt

**Tooltip:** Stop the CPU until it is reset.

## C API

```c
void os_halt() ;
```

### Description

halt CPU

### Example (composition)

```c
// Example showing nested calls e recursion
void os_halt() {
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
  "type": "os_halt",
  "message0": "halt CPU",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 10,
  "tooltip": "Stop the CPU until it is reset.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.