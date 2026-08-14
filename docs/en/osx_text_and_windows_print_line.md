<!-- auto-generated -->
# osx_text_and_windows_print_line

**Type:** `osx_text_and_windows_print_line`

**Display label:** print line text

**Kind:** statement (command)

**Category:** Text and windows

## Arguments

- **text** (string) — input slot 1

## Generated C call

```c
blockos_ext_text_and_windows_print_line(/* text */);
```

## Runtime prototype

```c
void blockos_ext_text_and_windows_print_line(const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_print_line(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
