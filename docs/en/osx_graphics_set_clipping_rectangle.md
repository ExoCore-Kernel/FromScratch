<!-- auto-generated -->
# osx_graphics_set_clipping_rectangle

**Type:** `osx_graphics_set_clipping_rectangle`

**Display label:** set clipping rectangle x y width height

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2
- **width** (number) — input slot 3
- **height** (number) — input slot 4

## Generated C call

```c
blockos_ext_graphics_set_clipping_rectangle(/* x */, /* y */, /* width */, /* height */);
```

## Runtime prototype

```c
void blockos_ext_graphics_set_clipping_rectangle(uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_set_clipping_rectangle(0, 0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
