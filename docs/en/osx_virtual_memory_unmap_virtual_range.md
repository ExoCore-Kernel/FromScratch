<!-- auto-generated -->
# osx_virtual_memory_unmap_virtual_range

**Type:** `osx_virtual_memory_unmap_virtual_range`

**Display label:** unmap virtual range virtual pages

**Kind:** statement (command)

**Category:** Virtual memory

## Arguments

- **virtual** (number) — input slot 1
- **pages** (number) — input slot 2

## Generated C call

```c
blockos_ext_virtual_memory_unmap_virtual_range(/* virtual */, /* pages */);
```

## Runtime prototype

```c
void blockos_ext_virtual_memory_unmap_virtual_range(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_unmap_virtual_range(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
