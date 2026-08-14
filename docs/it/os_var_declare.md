# os_var_declare

**Type:** os_var_declare

**Tooltip:** Create a local C variable.

## C API

```c
void os_var_declare(uint64_t arg0, uint64_t arg1, int64_t arg2) ;
```

### Description

create %1 variable %2 starting at %3

### Example (composition)

```c
// Example showing nested calls e recursion
void os_var_declare(uint64_t arg0, uint64_t arg1, int64_t arg2) {
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
  "type": "os_var_declare",
  "message0": "create %1 variable %2 starting at %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": [
        [
          "8-bit unsigned",
          "uint8_t"
        ],
        [
          "16-bit unsigned",
          "uint16_t"
        ],
        [
          "32-bit unsigned",
          "uint32_t"
        ],
        [
          "64-bit unsigned",
          "uint64_t"
        ],
        [
          "32-bit signed",
          "int32_t"
        ],
        [
          "64-bit signed",
          "int64_t"
        ],
        [
          "boolean",
          "bool"
        ],
        [
          "text",
          "const char *"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "counter"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Create a local C variable.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.