<!-- auto-generated -->
# osx_physical_memory_allocate_contiguous_physical_pages

**Type:** `osx_physical_memory_allocate_contiguous_physical_pages`

**Display label:** allocate contiguous physical pages page count

**Kind:** number value

**Category:** Physical memory

## Arguments

- **page count** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_physical_memory_allocate_contiguous_physical_pages(/* page count */)
```

## Runtime prototype

```c
uint64_t blockos_ext_physical_memory_allocate_contiguous_physical_pages(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_allocate_contiguous_physical_pages(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
