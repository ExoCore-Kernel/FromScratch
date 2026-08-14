<!-- auto-generated -->
# osx_text_and_windows_draw_text_at_position

**Type:** `osx_text_and_windows_draw_text_at_position`

**Display label:** draw text at position x y text colour

**Kind:** statement (command)

**Category:** Text and windows

## Arguments

- **x** (number) — input slot 1
- **y** (number) — input slot 2
- **text** (string) — input slot 3
- **colour** (number) — input slot 4

## Generated C call

```c
blockos_ext_text_and_windows_draw_text_at_position(/* x */, /* y */, /* text */, /* colour */);
```

## Runtime prototype

```c
void blockos_ext_text_and_windows_draw_text_at_position(uint64_t, uint64_t, const char *, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_draw_text_at_position(0, 0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
