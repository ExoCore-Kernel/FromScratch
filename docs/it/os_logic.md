# os_logic

**Type:** os_logic

**Tooltip:** Combine conditions.

## C API

```c
void os_logic(int64_t arg0, uint64_t arg1, int64_t arg2) ;
```

### Description

%1 %2 %3

### Example (composition)

```c
// Example showing nested calls e recursion
void os_logic(int64_t arg0, uint64_t arg1, int64_t arg2) {
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
  "type": "os_logic",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "Boolean"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        [
          "e",
          "AND"
        ],
        [
          "o",
          "OR"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "Boolean"
    }
  ],
  "inputsInline": vero,
  "output": "Boolean",
  "colour": 210,
  "tooltip": "Combine conditions.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.