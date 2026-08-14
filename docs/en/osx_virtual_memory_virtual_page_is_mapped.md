<!-- auto-generated -->
# osx_virtual_memory_virtual_page_is_mapped

**Type:** `osx_virtual_memory_virtual_page_is_mapped`

**Display label:** virtual page is mapped virtual

**Kind:** boolean value

**Category:** Virtual memory

## Arguments

- **virtual** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_virtual_memory_virtual_page_is_mapped(/* virtual */)
```

## Runtime prototype

```c
bool blockos_ext_virtual_memory_virtual_page_is_mapped(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_virtual_page_is_mapped(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
