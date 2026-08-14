<!-- auto-generated -->
# osx_keyboard_and_mouse_initialize_mouse

**Type:** `osx_keyboard_and_mouse_initialize_mouse`

**Display label:** initialize mouse

**Kind:** statement (command)

**Category:** Keyboard and mouse

## Generated C call

```c
blockos_ext_keyboard_and_mouse_initialize_mouse();
```

## Runtime prototype

```c
void blockos_ext_keyboard_and_mouse_initialize_mouse(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_initialize_mouse();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
