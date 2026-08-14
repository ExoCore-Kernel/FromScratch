<!-- auto-generated -->
# osx_physical_memory_physical_page_is_allocated

**Type:** `osx_physical_memory_physical_page_is_allocated`

**Display label:** physical page is allocated address

**Kind:** boolean value

**Category:** Physical memory

## Arguments

- **address** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_physical_memory_physical_page_is_allocated(/* address */)
```

## Runtime prototype

```c
bool blockos_ext_physical_memory_physical_page_is_allocated(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_physical_page_is_allocated(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
