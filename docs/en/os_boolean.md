# os_boolean

**Type:** os_boolean

**Tooltip:** A true or false value.

## C API

```c
void os_boolean(uint64_t arg0) ;
```

### Description

%1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_boolean(uint64_t arg0) {
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
  "type": "os_boolean",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "VALUE",
      "options": [
        [
          "true",
          "TRUE"
        ],
        [
          "false",
          "FALSE"
        ]
      ]
    }
  ],
  "output": "Boolean",
  "colour": 210,
  "tooltip": "A true or false value.",
  "helpUrl": ""
}
```
