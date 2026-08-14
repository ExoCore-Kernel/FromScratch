<!-- auto-generated -->
# osx_virtual_memory_flush_entire_tlb

**Type:** `osx_virtual_memory_flush_entire_tlb`

**Display label:** flush entire TLB

**Kind:** statement (command)

**Category:** Virtual memory

## Generated C call

```c
blockos_ext_virtual_memory_flush_entire_tlb();
```

## Runtime prototype

```c
void blockos_ext_virtual_memory_flush_entire_tlb(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_flush_entire_tlb();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
