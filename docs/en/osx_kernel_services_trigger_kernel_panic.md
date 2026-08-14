<!-- auto-generated -->
# osx_kernel_services_trigger_kernel_panic

**Type:** `osx_kernel_services_trigger_kernel_panic`

**Display label:** trigger kernel panic message

**Kind:** statement (command)

**Category:** Kernel services

## Arguments

- **message** (string) — input slot 1

## Generated C call

```c
blockos_ext_kernel_services_trigger_kernel_panic(/* message */);
```

## Runtime prototype

```c
void blockos_ext_kernel_services_trigger_kernel_panic(const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_trigger_kernel_panic(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
