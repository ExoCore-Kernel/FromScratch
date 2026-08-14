<!-- auto-generated -->
# osx_keyboard_and_mouse_set_mouse_cursor_visible

**Type:** `osx_keyboard_and_mouse_set_mouse_cursor_visible`

**Display label:** set mouse cursor visible visible

**Kind:** statement (command)

**Category:** Keyboard and mouse

## Arguments

- **visible** (boolean) — input slot 1

## Generated C call

```c
blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible(/* visible */);
```

## Runtime prototype

```c
void blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible(bool);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
