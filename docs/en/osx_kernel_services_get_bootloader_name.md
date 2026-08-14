<!-- auto-generated -->
# osx_kernel_services_get_bootloader_name

**Type:** `osx_kernel_services_get_bootloader_name`

**Display label:** get bootloader name

**Kind:** string value

**Category:** Kernel services

## Generated C expression

```c
(const char *) blockos_ext_kernel_services_get_bootloader_name()
```

## Runtime prototype

```c
const char * blockos_ext_kernel_services_get_bootloader_name(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_get_bootloader_name();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
