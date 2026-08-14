# os_math

**Type:** os_math

**Tooltip:** Arithmetic expression.

## C API

```c
void os_math(int64_t arg0, uint64_t arg1, int64_t arg2) ;
```

### Description

%1 %2 %3

### Example (composition)

```c
// Example showing nested calls and recursion
void os_math(int64_t arg0, uint64_t arg1, int64_t arg2) {
    // body generated from connected blocks
}

static void run_sequence(void) {
    // call generated block functions
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
  "type": "os_math",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        [
          "+",
          "ADD"
        ],
        [
          "−",
          "SUBTRACT"
        ],
        [
          "×",
          "MULTIPLY"
        ],
        [
          "÷",
          "DIVIDE"
        ],
        [
          "remainder",
          "MODULO"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 230,
  "tooltip": "Arithmetic expression.",
  "helpUrl": ""
}
```
