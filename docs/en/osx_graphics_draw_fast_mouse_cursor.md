<!-- auto-generated -->
# osx_graphics_draw_fast_mouse_cursor

**Type:** `osx_graphics_draw_fast_mouse_cursor`

**Display label:** draw fast mouse cursor x y

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2

## Generated C call

```c
blockos_ext_graphics_draw_fast_mouse_cursor(/* x */, /* y */);
```

## Runtime prototype

```c
void blockos_ext_graphics_draw_fast_mouse_cursor(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_fast_mouse_cursor(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
