<!-- auto-generated -->
# osx_kernel_heap_allocate_zeroed_items

**Type:** `osx_kernel_heap_allocate_zeroed_items`

**Display label:** allocate zeroed items count item size

**Kind:** number value

**Category:** Kernel heap

## Arguments

- **count** (number) — input slot 1
- **item size** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_kernel_heap_allocate_zeroed_items(/* count */, /* item size */)
```

## Runtime prototype

```c
uint64_t blockos_ext_kernel_heap_allocate_zeroed_items(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_allocate_zeroed_items(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
