<!-- auto-generated -->
# osx_text_and_windows_window_is_visible

**Type:** `osx_text_and_windows_window_is_visible`

**Display label:** window is visible window

**Kind:** boolean value

**Category:** Text and windows

## Arguments

- **window** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_text_and_windows_window_is_visible(/* window */)
```

## Runtime prototype

```c
bool blockos_ext_text_and_windows_window_is_visible(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_window_is_visible(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
