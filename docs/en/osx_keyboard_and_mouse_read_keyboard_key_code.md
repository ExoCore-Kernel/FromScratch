<!-- auto-generated -->
# osx_keyboard_and_mouse_read_keyboard_key_code

**Type:** `osx_keyboard_and_mouse_read_keyboard_key_code`

**Display label:** read keyboard key code

**Kind:** number value

**Category:** Keyboard and mouse

## Generated C expression

```c
(uint64_t) blockos_ext_keyboard_and_mouse_read_keyboard_key_code()
```

## Runtime prototype

```c
uint64_t blockos_ext_keyboard_and_mouse_read_keyboard_key_code(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_read_keyboard_key_code();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
