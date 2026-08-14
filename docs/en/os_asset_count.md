# os_asset_count

**Type:** os_asset_count

**Tooltip:** Number of files embedded into the bootable ISO.

## C API

```c
void os_asset_count() ;
```

### Description

uploaded file count

### Example (composition)

```c
// Example showing nested calls and recursion
void os_asset_count() {
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
  "type": "os_asset_count",
  "message0": "uploaded file count",
  "output": "Number",
  "colour": 25,
  "tooltip": "Number of files embedded into the bootable ISO.",
  "helpUrl": ""
}
```
