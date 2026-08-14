<!-- auto-generated -->
# osx_kernel_heap_resize_heap_allocation

**Type:** `osx_kernel_heap_resize_heap_allocation`

**Display label:** resize heap allocation address new size

**Kind:** number value

**Category:** Kernel heap

## Arguments

- **address** (number) — input slot 1
- **new size** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_kernel_heap_resize_heap_allocation(/* address */, /* new size */)
```

## Runtime prototype

```c
uint64_t blockos_ext_kernel_heap_resize_heap_allocation(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_resize_heap_allocation(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
