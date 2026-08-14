<!-- auto-generated -->
# osx_kernel_heap_free_heap_allocation

**Type:** `osx_kernel_heap_free_heap_allocation`

**Display label:** free heap allocation address

**Kind:** statement (command)

**Category:** Kernel heap

## Arguments

- **address** (number) — input slot 1

## Generated C call

```c
blockos_ext_kernel_heap_free_heap_allocation(/* address */);
```

## Runtime prototype

```c
void blockos_ext_kernel_heap_free_heap_allocation(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_free_heap_allocation(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
