<!-- auto-generated -->
# osx_graphics_draw_transparent_sprite

**Type:** `osx_graphics_draw_transparent_sprite`

**Display label:** draw transparent 32-bit sprite x y address width height transparent colour

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2
- **address** (number) — input slot 3
- **width** (number) — input slot 4
- **height** (number) — input slot 5
- **transparent colour** (number) — input slot 6

## Generated C call

```c
blockos_ext_graphics_draw_transparent_sprite(/* x */, /* y */, /* address */, /* width */, /* height */, /* transparent colour */);
```

## Runtime prototype

```c
void blockos_ext_graphics_draw_transparent_sprite(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_transparent_sprite(0, 0, 0, 0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
