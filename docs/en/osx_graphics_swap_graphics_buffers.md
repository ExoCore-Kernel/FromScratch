<!-- auto-generated -->
# osx_graphics_swap_graphics_buffers

**Type:** `osx_graphics_swap_graphics_buffers`

**Display label:** swap graphics buffers

**Kind:** statement (command)

**Category:** Graphics

## Generated C call

```c
blockos_ext_graphics_swap_graphics_buffers();
```

## Runtime prototype

```c
void blockos_ext_graphics_swap_graphics_buffers(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_swap_graphics_buffers();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
