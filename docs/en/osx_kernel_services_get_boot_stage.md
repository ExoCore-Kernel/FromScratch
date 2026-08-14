<!-- auto-generated -->
# osx_kernel_services_get_boot_stage

**Type:** `osx_kernel_services_get_boot_stage`

**Display label:** get boot stage

**Kind:** number value

**Category:** Kernel services

## Generated C expression

```c
(uint64_t) blockos_ext_kernel_services_get_boot_stage()
```

## Runtime prototype

```c
uint64_t blockos_ext_kernel_services_get_boot_stage(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_get_boot_stage();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
