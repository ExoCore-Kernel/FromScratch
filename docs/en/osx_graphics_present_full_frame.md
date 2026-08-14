<!-- auto-generated -->
# osx_graphics_present_full_frame

**Type:** `osx_graphics_present_full_frame`

**Display label:** present full graphics frame

**Kind:** statement (command)

**Category:** Graphics

## Generated C call

```c
blockos_ext_graphics_present_full_frame();
```

## Runtime prototype

```c
void blockos_ext_graphics_present_full_frame(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_present_full_frame();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
