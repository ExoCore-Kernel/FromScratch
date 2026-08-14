<!-- auto-generated -->
# osx_kernel_services_get_boot_command_line

**Type:** `osx_kernel_services_get_boot_command_line`

**Display label:** get boot command line

**Kind:** string value

**Category:** Kernel services

## Generated C expression

```c
(const char *) blockos_ext_kernel_services_get_boot_command_line()
```

## Runtime prototype

```c
const char * blockos_ext_kernel_services_get_boot_command_line(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_get_boot_command_line();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
