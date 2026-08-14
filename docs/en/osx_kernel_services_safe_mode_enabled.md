<!-- auto-generated -->
# osx_kernel_services_safe_mode_enabled

**Type:** `osx_kernel_services_safe_mode_enabled`

**Display label:** safe mode enabled

**Kind:** boolean value

**Category:** Kernel services

## Generated C expression

```c
(bool) blockos_ext_kernel_services_safe_mode_enabled()
```

## Runtime prototype

```c
bool blockos_ext_kernel_services_safe_mode_enabled(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_safe_mode_enabled();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
