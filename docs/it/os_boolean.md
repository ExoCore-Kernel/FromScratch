# os_boolean

**Type:** os_boolean

**Tooltip:** A vero o falso value.

## C API

```c
void os_boolean(uint64_t arg0) ;
```

### Description

%1

### Example (composition)

```c
// Example showing nested calls e recursion
void os_boolean(uint64_t arg0) {
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
  "type": "os_boolean",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "VALUE",
      "options": [
        [
          "vero",
          "TRUE"
        ],
        [
          "falso",
          "FALSE"
        ]
      ]
    }
  ],
  "output": "Boolean",
  "colour": 210,
  "tooltip": "A vero o falso value.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.