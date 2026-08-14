<!-- auto-generated -->
# osx_debug_and_information_get_runtime_version

**Type:** `osx_debug_and_information_get_runtime_version`

**Display label:** get runtime version

**Kind:** string value

**Category:** Debug and information

## Generated C expression

```c
(const char *) blockos_ext_debug_and_information_get_runtime_version()
```

## Runtime prototype

```c
const char * blockos_ext_debug_and_information_get_runtime_version(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_debug_and_information_get_runtime_version();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
