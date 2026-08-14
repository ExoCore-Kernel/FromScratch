<!-- auto-generated -->
# osx_networking_set_ipv4_address

**Type:** `osx_networking_set_ipv4_address`

**Display label:** set IPv4 address interface address

**Kind:** statement (command)

**Category:** Networking

## Arguments

- **interface** (number) — input slot 1
- **address** (number) — input slot 2

## Generated C call

```c
blockos_ext_networking_set_ipv4_address(/* interface */, /* address */);
```

## Runtime prototype

```c
void blockos_ext_networking_set_ipv4_address(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_networking_set_ipv4_address(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
