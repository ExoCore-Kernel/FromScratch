# os_forever

**Type:** os_forever

**Tooltip:** Repeat these blocks forever.

## C API

```c
void os_forever(uint64_t arg0) ;
```

### Description

forever %1

### Example (composition)

```c
// Example showing nested calls and recursion
void os_forever(uint64_t arg0) {
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
  "tooltip": "Repeat these blocks forever.",
  "helpUrl": ""
}
```
