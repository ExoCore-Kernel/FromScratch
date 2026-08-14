<!-- auto-generated -->
# osx_keyboard_and_mouse_get_mouse_y

**Type:** `osx_keyboard_and_mouse_get_mouse_y`

**Display label:** get mouse y

**Kind:** number value

**Category:** Keyboard and mouse

## Generated C expression

```c
(uint64_t) blockos_ext_keyboard_and_mouse_get_mouse_y()
```

## Runtime prototype

```c
uint64_t blockos_ext_keyboard_and_mouse_get_mouse_y(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_get_mouse_y();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
