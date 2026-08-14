<!-- auto-generated -->
# osx_networking_get_ipv4_address

**Type:** `osx_networking_get_ipv4_address`

**Display label:** get IPv4 address interface

**Kind:** number value

**Category:** Networking

## Arguments

- **interface** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_networking_get_ipv4_address(/* interface */)
```

## Runtime prototype

```c
uint64_t blockos_ext_networking_get_ipv4_address(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_get_ipv4_address(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
