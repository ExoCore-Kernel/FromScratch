<!-- auto-generated -->
# osx_physical_memory_reserve_physical_range

**Type:** `osx_physical_memory_reserve_physical_range`

**Display label:** reserve physical range start length

**Kind:** statement (command)

**Category:** Physical memory

## Arguments

- **start** (number) — input slot 1
- **length** (number) — input slot 2

## Generated C call

```c
blockos_ext_physical_memory_reserve_physical_range(/* start */, /* length */);
```

## Runtime prototype

```c
void blockos_ext_physical_memory_reserve_physical_range(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_physical_memory_reserve_physical_range(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
