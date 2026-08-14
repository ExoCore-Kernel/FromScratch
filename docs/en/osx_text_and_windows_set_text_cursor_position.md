<!-- auto-generated -->
# osx_text_and_windows_set_text_cursor_position

**Type:** `osx_text_and_windows_set_text_cursor_position`

**Display label:** set text cursor position x y

**Kind:** statement (command)

**Category:** Text and windows

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2

## Generated C call

```c
blockos_ext_text_and_windows_set_text_cursor_position(/* x */, /* y */);
```

## Runtime prototype

```c
void blockos_ext_text_and_windows_set_text_cursor_position(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_set_text_cursor_position(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
