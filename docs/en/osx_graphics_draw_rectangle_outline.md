<!-- auto-generated -->
# osx_graphics_draw_rectangle_outline

**Type:** `osx_graphics_draw_rectangle_outline`

**Display label:** draw rectangle outline x y width height colour

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2
- **width** (number) — input slot 3
- **height** (number) — input slot 4
- **colour** (number) — input slot 5

## Generated C call

```c
blockos_ext_graphics_draw_rectangle_outline(/* x */, /* y */, /* width */, /* height */, /* colour */);
```

## Runtime prototype

```c
void blockos_ext_graphics_draw_rectangle_outline(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_rectangle_outline(0, 0, 0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
