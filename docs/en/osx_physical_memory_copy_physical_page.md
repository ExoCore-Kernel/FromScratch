<!-- auto-generated -->
# osx_physical_memory_copy_physical_page

**Type:** `osx_physical_memory_copy_physical_page`

**Display label:** copy physical page destination source

**Kind:** statement (command)

**Category:** Physical memory

## Arguments

- **destination** (number) — input slot 1
- **source** (number) — input slot 2

## Generated C call

```c
blockos_ext_physical_memory_copy_physical_page(/* destination */, /* source */);
```

## Runtime prototype

```c
void blockos_ext_physical_memory_copy_physical_page(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_physical_memory_copy_physical_page(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
