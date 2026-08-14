<!-- auto-generated -->
# osx_text_and_windows_measure_text_width

**Type:** `osx_text_and_windows_measure_text_width`

**Display label:** measure text width text

**Kind:** number value

**Category:** Text and windows

## Arguments

- **text** (string) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_text_and_windows_measure_text_width(/* text */)
```

## Runtime prototype

```c
uint64_t blockos_ext_text_and_windows_measure_text_width(const char *);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_measure_text_width(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
