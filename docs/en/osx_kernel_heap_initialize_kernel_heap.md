<!-- auto-generated -->
# osx_kernel_heap_initialize_kernel_heap

**Type:** `osx_kernel_heap_initialize_kernel_heap`

**Display label:** initialize kernel heap start size

**Kind:** statement (command)

**Category:** Kernel heap

## Arguments

- **start** (number) — input slot 1
- **size** (number) — input slot 2

## Generated C call

```c
blockos_ext_kernel_heap_initialize_kernel_heap(/* start */, /* size */);
```

## Runtime prototype

```c
void blockos_ext_kernel_heap_initialize_kernel_heap(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_initialize_kernel_heap(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
