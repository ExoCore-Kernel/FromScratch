<!-- auto-generated -->
# osx_graphics_draw_pixel_line_fast

**Type:** `osx_graphics_draw_pixel_line_fast`

**Display label:** draw fast pixel line x1 y1 x2 y2 colour

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **x1** (number) — input slot 1
- **y1** (number) — input slot 2
- **x2** (number) — input slot 3
- **y2** (number) — input slot 4
- **colour** (number) — input slot 5

## Generated C call

```c
blockos_ext_graphics_draw_pixel_line_fast(/* x1 */, /* y1 */, /* x2 */, /* y2 */, /* colour */);
```

## Runtime prototype

```c
void blockos_ext_graphics_draw_pixel_line_fast(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_pixel_line_fast(0, 0, 0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
