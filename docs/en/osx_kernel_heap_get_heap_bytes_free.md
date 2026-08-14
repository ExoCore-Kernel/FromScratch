<!-- auto-generated -->
# osx_kernel_heap_get_heap_bytes_free

**Type:** `osx_kernel_heap_get_heap_bytes_free`

**Display label:** get heap bytes free

**Kind:** number value

**Category:** Kernel heap

## Generated C expression

```c
(uint64_t) blockos_ext_kernel_heap_get_heap_bytes_free()
```

## Runtime prototype

```c
uint64_t blockos_ext_kernel_heap_get_heap_bytes_free(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_get_heap_bytes_free();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
