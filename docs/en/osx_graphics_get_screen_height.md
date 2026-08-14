<!-- auto-generated -->
# osx_graphics_get_screen_height

**Type:** `osx_graphics_get_screen_height`

**Display label:** get screen height

**Kind:** number value

**Category:** Graphics

## Generated C expression

```c
(uint64_t) blockos_ext_graphics_get_screen_height()
```

## Runtime prototype

```c
uint64_t blockos_ext_graphics_get_screen_height(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_graphics_get_screen_height();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
