# os_set_text_location

**Type:** os_set_text_location

**Tooltip:** Choose where Print Text starts drawing. Each new Print Text line advances from this anchor.

## C API

```c
void os_set_text_location(uint64_t arg0) ;
```

### Description

set text location %1

### Example (composition)

```c
// Example showing nested calls e recursion
void os_set_text_location(uint64_t arg0) {
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
  "type": "os_set_text_location",
  "message0": "set text location %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "LOCATION",
      "options": [
        [
          "top left",
          "0"
        ],
        [
          "top centre",
          "1"
        ],
        [
          "top right",
          "2"
        ],
        [
          "middle left",
          "3"
        ],
        [
          "centre",
          "4"
        ],
        [
          "middle right",
          "5"
        ],
        [
          "bottom left",
          "6"
        ],
        [
          "bottom centre",
          "7"
        ],
        [
          "bottom right",
          "8"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Choose where Print Text starts drawing. Each new Print Text line advances from this anchor.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.