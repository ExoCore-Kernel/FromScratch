<!-- auto-generated -->
# osx_kernel_heap_dump_kernel_heap

**Type:** `osx_kernel_heap_dump_kernel_heap`

**Display label:** dump kernel heap

**Kind:** statement (command)

**Category:** Kernel heap

## Generated C call

```c
blockos_ext_kernel_heap_dump_kernel_heap();
```

## Runtime prototype

```c
void blockos_ext_kernel_heap_dump_kernel_heap(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_dump_kernel_heap();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
