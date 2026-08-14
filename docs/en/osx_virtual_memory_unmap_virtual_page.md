<!-- auto-generated -->
# osx_virtual_memory_unmap_virtual_page

**Type:** `osx_virtual_memory_unmap_virtual_page`

**Display label:** unmap virtual page virtual

**Kind:** statement (command)

**Category:** Virtual memory

## Arguments

- **virtual** (number) — input slot 1

## Generated C call

```c
blockos_ext_virtual_memory_unmap_virtual_page(/* virtual */);
```

## Runtime prototype

```c
void blockos_ext_virtual_memory_unmap_virtual_page(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_unmap_virtual_page(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
