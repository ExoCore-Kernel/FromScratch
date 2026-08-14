<!-- auto-generated -->
# osx_networking_close_network_socket

**Type:** `osx_networking_close_network_socket`

**Display label:** close network socket socket

**Kind:** statement (command)

**Category:** Networking

## Arguments

- **socket** (number) — input slot 1

## Generated C call

```c
blockos_ext_networking_close_network_socket(/* socket */);
```

## Runtime prototype

```c
void blockos_ext_networking_close_network_socket(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_networking_close_network_socket(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
