<!-- auto-generated -->
# osx_graphics_clear_clipping_rectangle

**Type:** `osx_graphics_clear_clipping_rectangle`

**Display label:** clear clipping rectangle

**Kind:** statement (command)

**Category:** Graphics

## Generated C call

```c
blockos_ext_graphics_clear_clipping_rectangle();
```

## Runtime prototype

```c
void blockos_ext_graphics_clear_clipping_rectangle(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_clear_clipping_rectangle();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
