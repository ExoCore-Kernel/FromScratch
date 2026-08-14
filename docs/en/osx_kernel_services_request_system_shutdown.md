<!-- auto-generated -->
# osx_kernel_services_request_system_shutdown

**Type:** `osx_kernel_services_request_system_shutdown`

**Display label:** request system shutdown

**Kind:** statement (command)

**Category:** Kernel services

## Generated C call

```c
blockos_ext_kernel_services_request_system_shutdown();
```

## Runtime prototype

```c
void blockos_ext_kernel_services_request_system_shutdown(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_request_system_shutdown();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
