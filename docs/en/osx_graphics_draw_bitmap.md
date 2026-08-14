<!-- auto-generated -->
# osx_graphics_draw_bitmap

**Type:** `osx_graphics_draw_bitmap`

**Display label:** draw bitmap x y address width height

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2
- **address** (number) — input slot 3
- **width** (number) — input slot 4
- **height** (number) — input slot 5

## Generated C call

```c
blockos_ext_graphics_draw_bitmap(/* x */, /* y */, /* address */, /* width */, /* height */);
```

## Runtime prototype

```c
void blockos_ext_graphics_draw_bitmap(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_bitmap(0, 0, 0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
