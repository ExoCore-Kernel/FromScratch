<!-- auto-generated -->
# osx_networking_set_ipv4_gateway

**Type:** `osx_networking_set_ipv4_gateway`

**Display label:** set IPv4 gateway interface gateway

**Kind:** statement (command)

**Category:** Networking

## Arguments

- **interface** (number) — input slot 1
- **gateway** (number) — input slot 2

## Generated C call

```c
blockos_ext_networking_set_ipv4_gateway(/* interface */, /* gateway */);
```

## Runtime prototype

```c
void blockos_ext_networking_set_ipv4_gateway(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_networking_set_ipv4_gateway(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
