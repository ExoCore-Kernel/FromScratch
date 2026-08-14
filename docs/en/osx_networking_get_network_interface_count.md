<!-- auto-generated -->
# osx_networking_get_network_interface_count

**Type:** `osx_networking_get_network_interface_count`

**Display label:** get network interface count

**Kind:** number value

**Category:** Networking

## Generated C expression

```c
(uint64_t) blockos_ext_networking_get_network_interface_count()
```

## Runtime prototype

```c
uint64_t blockos_ext_networking_get_network_interface_count(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_get_network_interface_count();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
