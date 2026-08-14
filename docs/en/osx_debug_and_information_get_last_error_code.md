<!-- auto-generated -->
# osx_debug_and_information_get_last_error_code

**Type:** `osx_debug_and_information_get_last_error_code`

**Display label:** get last error code

**Kind:** number value

**Category:** Debug and information

## Generated C expression

```c
(uint64_t) blockos_ext_debug_and_information_get_last_error_code()
```

## Runtime prototype

```c
uint64_t blockos_ext_debug_and_information_get_last_error_code(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_debug_and_information_get_last_error_code();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
