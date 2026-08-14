<!-- auto-generated -->
# osx_kernel_heap_create_memory_pool

**Type:** `osx_kernel_heap_create_memory_pool`

**Display label:** create memory pool item size item count

**Kind:** number value

**Category:** Kernel heap

## Arguments

- **item size** (number) — input slot 1
- **item count** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_kernel_heap_create_memory_pool(/* item size */, /* item count */)
```

## Runtime prototype

```c
uint64_t blockos_ext_kernel_heap_create_memory_pool(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_create_memory_pool(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
