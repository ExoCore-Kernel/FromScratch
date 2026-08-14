<!-- auto-generated -->
# osx_virtual_memory_get_current_address_space

**Type:** `osx_virtual_memory_get_current_address_space`

**Display label:** get current address space

**Kind:** number value

**Category:** Virtual memory

## Generated C expression

```c
(uint64_t) blockos_ext_virtual_memory_get_current_address_space()
```

## Runtime prototype

```c
uint64_t blockos_ext_virtual_memory_get_current_address_space(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_get_current_address_space();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
