<!-- auto-generated -->
# osx_text_and_windows_resize_window

**Type:** `osx_text_and_windows_resize_window`

**Display label:** resize window window width height

**Kind:** statement (command)

**Category:** Text and windows

## Arguments

- **window** (number) — input slot 1
- **width** (number) — input slot 2
- **height** (number) — input slot 3

## Generated C call

```c
blockos_ext_text_and_windows_resize_window(/* window */, /* width */, /* height */);
```

## Runtime prototype

```c
void blockos_ext_text_and_windows_resize_window(uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_resize_window(0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
