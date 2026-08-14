<!-- auto-generated -->
# osx_kernel_heap_free_to_memory_pool

**Type:** `osx_kernel_heap_free_to_memory_pool`

**Display label:** free to memory pool pool address

**Kind:** statement (command)

**Category:** Kernel heap

## Arguments

- **pool** (number) — input slot 1
- **address** (number) — input slot 2

## Generated C call

```c
blockos_ext_kernel_heap_free_to_memory_pool(/* pool */, /* address */);
```

## Runtime prototype

```c
void blockos_ext_kernel_heap_free_to_memory_pool(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_free_to_memory_pool(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
