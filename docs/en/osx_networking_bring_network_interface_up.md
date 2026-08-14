<!-- auto-generated -->
# osx_networking_bring_network_interface_up

**Type:** `osx_networking_bring_network_interface_up`

**Display label:** bring network interface up interface

**Kind:** statement (command)

**Category:** Networking

## Arguments

- **interface** (number) — input slot 1

## Generated C call

```c
blockos_ext_networking_bring_network_interface_up(/* interface */);
```

## Runtime prototype

```c
void blockos_ext_networking_bring_network_interface_up(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_networking_bring_network_interface_up(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
