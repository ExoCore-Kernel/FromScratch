<!-- auto-generated -->
# osx_text_and_windows_get_text_cursor_x

**Type:** `osx_text_and_windows_get_text_cursor_x`

**Display label:** get text cursor x

**Kind:** number value

**Category:** Text and windows

## Generated C expression

```c
(uint64_t) blockos_ext_text_and_windows_get_text_cursor_x()
```

## Runtime prototype

```c
uint64_t blockos_ext_text_and_windows_get_text_cursor_x(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_get_text_cursor_x();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
