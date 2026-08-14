<!-- auto-generated -->
# osx_physical_memory_allocate_physical_page

**Type:** `osx_physical_memory_allocate_physical_page`

**Display label:** allocate physical page

**Kind:** number value

**Category:** Physical memory

## Generated C expression

```c
(uint64_t) blockos_ext_physical_memory_allocate_physical_page()
```

## Runtime prototype

```c
uint64_t blockos_ext_physical_memory_allocate_physical_page(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_allocate_physical_page();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
