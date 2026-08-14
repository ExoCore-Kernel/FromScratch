# os_port_read8

**Type:** os_port_read8

**Tooltip:** Read an x86 I/O port. This is architecture-specific e unsafe.

## C API

```c
void os_port_read8(int64_t arg0) ;
```

### Description

read 8-bit hardware port %1

### Example (composition)

```c
// Example showing nested calls e recursion
void os_port_read8(int64_t arg0) {
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
  "type": "os_port_read8",
  "message0": "read 8-bit hardware port %1",
  "args0": [
    {
      "type": "input_value",
      "name": "PORT",
      "check": "Numero"
    }
  ],
  "output": "Numero",
  "colour": 10,
  "tooltip": "Read an x86 I/O port. This is architecture-specific e unsafe.",
  "helpUrl": ""
}
```


> NOTE: traduzione automatica, verificare e adattare gli esempi.