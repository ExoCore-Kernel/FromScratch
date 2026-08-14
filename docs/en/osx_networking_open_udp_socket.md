<!-- auto-generated -->
# osx_networking_open_udp_socket

**Type:** `osx_networking_open_udp_socket`

**Display label:** open UDP socket port

**Kind:** number value

**Category:** Networking

## Arguments

- **port** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_networking_open_udp_socket(/* port */)
```

## Runtime prototype

```c
uint64_t blockos_ext_networking_open_udp_socket(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_open_udp_socket(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
