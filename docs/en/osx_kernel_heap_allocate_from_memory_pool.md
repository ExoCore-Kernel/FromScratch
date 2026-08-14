<!-- auto-generated -->
# osx_kernel_heap_allocate_from_memory_pool

**Type:** `osx_kernel_heap_allocate_from_memory_pool`

**Display label:** allocate from memory pool pool

**Kind:** number value

**Category:** Kernel heap

## Arguments

- **pool** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_kernel_heap_allocate_from_memory_pool(/* pool */)
```

## Runtime prototype

```c
uint64_t blockos_ext_kernel_heap_allocate_from_memory_pool(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_allocate_from_memory_pool(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
