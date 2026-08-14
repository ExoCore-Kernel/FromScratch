<!-- auto-generated -->
# osx_text_and_windows_create_window

**Type:** `osx_text_and_windows_create_window`

**Display label:** create window title x y width height

**Kind:** number value

**Category:** Text and windows

## Arguments

- **title** (string) — input slot 1
- **x** (number) — input slot 2
- **y** (number) — input slot 3
- **width** (number) — input slot 4
- **height** (number) — input slot 5

## Generated C expression

```c
(uint64_t) blockos_ext_text_and_windows_create_window(/* title */, /* x */, /* y */, /* width */, /* height */)
```

## Runtime prototype

```c
uint64_t blockos_ext_text_and_windows_create_window(const char *, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_create_window(0, 0, 0, 0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
