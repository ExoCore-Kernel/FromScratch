<!-- auto-generated -->
# osx_kernel_services_set_safe_mode

**Type:** `osx_kernel_services_set_safe_mode`

**Display label:** set safe mode enabled

**Kind:** statement (command)

**Category:** Kernel services

## Arguments

- **enabled** (boolean) — input slot 1

## Generated C call

```c
blockos_ext_kernel_services_set_safe_mode(/* enabled */);
```

## Runtime prototype

```c
void blockos_ext_kernel_services_set_safe_mode(bool);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_set_safe_mode(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
