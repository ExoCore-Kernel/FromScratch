<!-- auto-generated -->
# osx_kernel_services_set_kernel_status_code

**Type:** `osx_kernel_services_set_kernel_status_code`

**Display label:** set kernel status code code

**Kind:** statement (command)

**Category:** Kernel services

## Arguments

- **code** (number) — input slot 1

## Generated C call

```c
blockos_ext_kernel_services_set_kernel_status_code(/* code */);
```

## Runtime prototype

```c
void blockos_ext_kernel_services_set_kernel_status_code(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_set_kernel_status_code(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
