<!-- auto-generated -->
# osx_networking_initialize_network_stack

**Type:** `osx_networking_initialize_network_stack`

**Display label:** initialize network stack

**Kind:** statement (command)

**Category:** Networking

## Generated C call

```c
blockos_ext_networking_initialize_network_stack();
```

## Runtime prototype

```c
void blockos_ext_networking_initialize_network_stack(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_networking_initialize_network_stack();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
