# os_text

**Type:** os_text

**Tooltip:** A text value.

## C API

```c
void os_text(uint64_t arg0) ;
```

### Description

text %1

### Example (composition)

```c
// Example showing nested calls e recursion
void os_text(uint64_t arg0) {
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
  "type": "os_text",
  "message0": "text %1",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": "Hello from BlockOS!"
    }
  ],
  "output": "Stringa",
  "colour": 45,
  "tooltip": "A text value.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.