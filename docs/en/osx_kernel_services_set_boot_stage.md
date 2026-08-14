<!-- auto-generated -->
# osx_kernel_services_set_boot_stage

**Type:** `osx_kernel_services_set_boot_stage`

**Display label:** set boot stage stage

**Kind:** statement (command)

**Category:** Kernel services

## Arguments

- **stage** (number) — input slot 1

## Generated C call

```c
blockos_ext_kernel_services_set_boot_stage(/* stage */);
```

## Runtime prototype

```c
void blockos_ext_kernel_services_set_boot_stage(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_set_boot_stage(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
