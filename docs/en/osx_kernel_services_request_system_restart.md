<!-- auto-generated -->
# osx_kernel_services_request_system_restart

**Type:** `osx_kernel_services_request_system_restart`

**Display label:** request system restart

**Kind:** statement (command)

**Category:** Kernel services

## Generated C call

```c
blockos_ext_kernel_services_request_system_restart();
```

## Runtime prototype

```c
void blockos_ext_kernel_services_request_system_restart(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_request_system_restart();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
