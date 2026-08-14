<!-- auto-generated -->
# osx_physical_memory_get_memory_map_entry_start

**Type:** `osx_physical_memory_get_memory_map_entry_start`

**Display label:** get memory map entry start index

**Kind:** number value

**Category:** Physical memory

## Arguments

- **index** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_physical_memory_get_memory_map_entry_start(/* index */)
```

## Runtime prototype

```c
uint64_t blockos_ext_physical_memory_get_memory_map_entry_start(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_get_memory_map_entry_start(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
