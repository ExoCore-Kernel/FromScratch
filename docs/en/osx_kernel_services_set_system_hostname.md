<!-- auto-generated -->
# osx_kernel_services_set_system_hostname

**Type:** `osx_kernel_services_set_system_hostname`

**Display label:** set system hostname hostname

**Kind:** statement (command)

**Category:** Kernel services

## Arguments

- **hostname** (string) — input slot 1

## Generated C call

```c
blockos_ext_kernel_services_set_system_hostname(/* hostname */);
```

## Runtime prototype

```c
void blockos_ext_kernel_services_set_system_hostname(const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_set_system_hostname(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
