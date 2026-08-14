<!-- auto-generated -->
# osx_graphics_restore_screen_region

**Type:** `osx_graphics_restore_screen_region`

**Display label:** restore saved screen region slot 0-7 x y

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **slot 0-7** (number) — input slot 1
- **x** (number) — input slot 2
- **y** (number) — input slot 3

## Generated C call

```c
blockos_ext_graphics_restore_screen_region(/* slot 0-7 */, /* x */, /* y */);
```

## Runtime prototype

```c
void blockos_ext_graphics_restore_screen_region(uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_restore_screen_region(0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
