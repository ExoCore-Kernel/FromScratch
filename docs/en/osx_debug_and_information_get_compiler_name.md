<!-- auto-generated -->
# osx_debug_and_information_get_compiler_name

**Type:** `osx_debug_and_information_get_compiler_name`

**Display label:** get compiler name

**Kind:** string value

**Category:** Debug and information

## Generated C expression

```c
(const char *) blockos_ext_debug_and_information_get_compiler_name()
```

## Runtime prototype

```c
const char * blockos_ext_debug_and_information_get_compiler_name(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_debug_and_information_get_compiler_name();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
