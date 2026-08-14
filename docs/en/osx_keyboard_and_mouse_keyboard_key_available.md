<!-- auto-generated -->
# osx_keyboard_and_mouse_keyboard_key_available

**Type:** `osx_keyboard_and_mouse_keyboard_key_available`

**Display label:** keyboard key available

**Kind:** boolean value

**Category:** Keyboard and mouse

## Generated C expression

```c
(bool) blockos_ext_keyboard_and_mouse_keyboard_key_available()
```

## Runtime prototype

```c
bool blockos_ext_keyboard_and_mouse_keyboard_key_available(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_keyboard_key_available();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
