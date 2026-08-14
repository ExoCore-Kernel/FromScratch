<!-- auto-generated -->
# osx_networking_network_interface_is_up

**Type:** `osx_networking_network_interface_is_up`

**Display label:** network interface is up interface

**Kind:** boolean value

**Category:** Networking

## Arguments

- **interface** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_networking_network_interface_is_up(/* interface */)
```

## Runtime prototype

```c
bool blockos_ext_networking_network_interface_is_up(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_network_interface_is_up(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
