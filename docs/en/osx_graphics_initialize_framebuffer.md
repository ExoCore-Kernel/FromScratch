<!-- auto-generated -->
# osx_graphics_initialize_framebuffer

**Type:** `osx_graphics_initialize_framebuffer`

**Display label:** initialize framebuffer

**Kind:** statement (command)

**Category:** Graphics

## Generated C call

```c
blockos_ext_graphics_initialize_framebuffer();
```

## Runtime prototype

```c
void blockos_ext_graphics_initialize_framebuffer(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_initialize_framebuffer();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
