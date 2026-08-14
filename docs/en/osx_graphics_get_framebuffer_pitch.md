<!-- auto-generated -->
# osx_graphics_get_framebuffer_pitch

**Type:** `osx_graphics_get_framebuffer_pitch`

**Display label:** get framebuffer pitch

**Kind:** number value

**Category:** Graphics

## Generated C expression

```c
(uint64_t) blockos_ext_graphics_get_framebuffer_pitch()
```

## Runtime prototype

```c
uint64_t blockos_ext_graphics_get_framebuffer_pitch(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_graphics_get_framebuffer_pitch();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
