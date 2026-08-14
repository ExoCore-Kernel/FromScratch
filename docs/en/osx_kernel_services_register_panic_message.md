<!-- auto-generated -->
# osx_kernel_services_register_panic_message

**Type:** `osx_kernel_services_register_panic_message`

**Display label:** register panic message message

**Kind:** statement (command)

**Category:** Kernel services

## Arguments

- **message** (string) — input slot 1

## Generated C call

```c
blockos_ext_kernel_services_register_panic_message(/* message */);
```

## Runtime prototype

```c
void blockos_ext_kernel_services_register_panic_message(const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_services_register_panic_message(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
