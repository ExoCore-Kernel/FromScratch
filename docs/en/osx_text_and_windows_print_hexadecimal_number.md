<!-- auto-generated -->
# osx_text_and_windows_print_hexadecimal_number

**Type:** `osx_text_and_windows_print_hexadecimal_number`

**Display label:** print hexadecimal number value

**Kind:** statement (command)

**Category:** Text and windows

## Arguments

- **value** (number) — input slot 1

## Generated C call

```c
blockos_ext_text_and_windows_print_hexadecimal_number(/* value */);
```

## Runtime prototype

```c
void blockos_ext_text_and_windows_print_hexadecimal_number(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_print_hexadecimal_number(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
