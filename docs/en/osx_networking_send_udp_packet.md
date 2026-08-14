<!-- auto-generated -->
# osx_networking_send_udp_packet

**Type:** `osx_networking_send_udp_packet`

**Display label:** send UDP packet socket address port buffer length

**Kind:** number value

**Category:** Networking

## Arguments

- **socket** (number) — input slot 1
- **address** (number) — input slot 2
- **port** (number) — input slot 3
- **buffer** (number) — input slot 4
- **length** (number) — input slot 5

## Generated C expression

```c
(uint64_t) blockos_ext_networking_send_udp_packet(/* socket */, /* address */, /* port */, /* buffer */, /* length */)
```

## Runtime prototype

```c
uint64_t blockos_ext_networking_send_udp_packet(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_send_udp_packet(0, 0, 0, 0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
