<!-- auto-generated -->
# osx_virtual_memory_destroy_address_space

**Type:** `osx_virtual_memory_destroy_address_space`

**Display label:** destroy address space address space

**Kind:** statement (command)

**Category:** Virtual memory

## Arguments

- **address space** (number) — input slot 1

## Generated C call

```c
blockos_ext_virtual_memory_destroy_address_space(/* address space */);
```

## Runtime prototype

```c
void blockos_ext_virtual_memory_destroy_address_space(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_destroy_address_space(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
