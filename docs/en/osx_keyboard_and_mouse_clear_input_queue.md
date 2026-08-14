<!-- auto-generated -->
# osx_keyboard_and_mouse_clear_input_queue

**Type:** `osx_keyboard_and_mouse_clear_input_queue`

**Display label:** clear input queue

**Kind:** statement (command)

**Category:** Keyboard and mouse

## Generated C call

```c
blockos_ext_keyboard_and_mouse_clear_input_queue();
```

## Runtime prototype

```c
void blockos_ext_keyboard_and_mouse_clear_input_queue(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_clear_input_queue();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
