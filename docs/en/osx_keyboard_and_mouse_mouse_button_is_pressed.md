<!-- auto-generated -->
# osx_keyboard_and_mouse_mouse_button_is_pressed

**Type:** `osx_keyboard_and_mouse_mouse_button_is_pressed`

**Display label:** mouse button is pressed button

**Kind:** boolean value

**Category:** Keyboard and mouse

## Arguments

- **button** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_keyboard_and_mouse_mouse_button_is_pressed(/* button */)
```

## Runtime prototype

```c
bool blockos_ext_keyboard_and_mouse_mouse_button_is_pressed(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_mouse_button_is_pressed(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
