<!-- auto-generated -->
# osx_graphics_copy_screen_region

**Type:** `osx_graphics_copy_screen_region`

**Display label:** copy screen region source x source y destination x destination y width height

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **source x** (number) — input slot 1
- **source y** (number) — input slot 2
- **destination x** (number) — input slot 3
- **destination y** (number) — input slot 4
- **width** (number) — input slot 5
- **height** (number) — input slot 6

## Generated C call

```c
blockos_ext_graphics_copy_screen_region(/* source x */, /* source y */, /* destination x */, /* destination y */, /* width */, /* height */);
```

## Runtime prototype

```c
void blockos_ext_graphics_copy_screen_region(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_copy_screen_region(0, 0, 0, 0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
