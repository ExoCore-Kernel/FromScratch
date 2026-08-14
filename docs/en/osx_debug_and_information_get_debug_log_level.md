<!-- auto-generated -->
# osx_debug_and_information_get_debug_log_level

**Type:** `osx_debug_and_information_get_debug_log_level`

**Display label:** get debug log level

**Kind:** number value

**Category:** Debug and information

## Generated C expression

```c
(uint64_t) blockos_ext_debug_and_information_get_debug_log_level()
```

## Runtime prototype

```c
uint64_t blockos_ext_debug_and_information_get_debug_log_level(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_debug_and_information_get_debug_log_level();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
