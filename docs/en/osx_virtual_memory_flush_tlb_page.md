<!-- auto-generated -->
# osx_virtual_memory_flush_tlb_page

**Type:** `osx_virtual_memory_flush_tlb_page`

**Display label:** flush TLB page virtual

**Kind:** statement (command)

**Category:** Virtual memory

## Arguments

- **virtual** (number) — input slot 1

## Generated C call

```c
blockos_ext_virtual_memory_flush_tlb_page(/* virtual */);
```

## Runtime prototype

```c
void blockos_ext_virtual_memory_flush_tlb_page(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_flush_tlb_page(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
