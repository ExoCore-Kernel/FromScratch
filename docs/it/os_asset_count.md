# os_asset_count

**Type:** os_asset_count

**Tooltip:** Numero di file incorporati nell'ISO avviabile.

## C API

```c
void os_asset_count() ;
```

### Description

uploaded file count

### Example (composition)

```c
// Example showing nested calls e recursion
void os_asset_count() {
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
  "type": "os_asset_count",
  "message0": "uploaded file count",
  "output": "Numero",
  "colour": 25,
  "tooltip": "Numero di file incorporati nell'ISO avviabile.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.