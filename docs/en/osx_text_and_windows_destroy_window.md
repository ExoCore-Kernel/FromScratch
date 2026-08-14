<!-- auto-generated -->
# osx_text_and_windows_destroy_window

**Type:** `osx_text_and_windows_destroy_window`

**Display label:** destroy window window

**Kind:** statement (command)

**Category:** Text and windows

## Arguments

- **window** (number) — input slot 1

## Generated C call

```c
blockos_ext_text_and_windows_destroy_window(/* window */);
```

## Runtime prototype

```c
void blockos_ext_text_and_windows_destroy_window(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_destroy_window(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
