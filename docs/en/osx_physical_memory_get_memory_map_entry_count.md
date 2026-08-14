<!-- auto-generated -->
# osx_physical_memory_get_memory_map_entry_count

**Type:** `osx_physical_memory_get_memory_map_entry_count`

**Display label:** get memory map entry count

**Kind:** number value

**Category:** Physical memory

## Generated C expression

```c
(uint64_t) blockos_ext_physical_memory_get_memory_map_entry_count()
```

## Runtime prototype

```c
uint64_t blockos_ext_physical_memory_get_memory_map_entry_count(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_get_memory_map_entry_count();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
