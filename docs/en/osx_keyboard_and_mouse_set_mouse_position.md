<!-- auto-generated -->
# osx_keyboard_and_mouse_set_mouse_position

**Type:** `osx_keyboard_and_mouse_set_mouse_position`

**Display label:** set mouse position x y

**Kind:** statement (command)

**Category:** Keyboard and mouse

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2

## Generated C call

```c
blockos_ext_keyboard_and_mouse_set_mouse_position(/* x */, /* y */);
```

## Runtime prototype

```c
void blockos_ext_keyboard_and_mouse_set_mouse_position(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_set_mouse_position(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
