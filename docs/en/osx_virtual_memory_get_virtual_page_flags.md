<!-- auto-generated -->
# osx_virtual_memory_get_virtual_page_flags

**Type:** `osx_virtual_memory_get_virtual_page_flags`

**Display label:** get virtual page flags virtual

**Kind:** number value

**Category:** Virtual memory

## Arguments

- **virtual** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_virtual_memory_get_virtual_page_flags(/* virtual */)
```

## Runtime prototype

```c
uint64_t blockos_ext_virtual_memory_get_virtual_page_flags(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_get_virtual_page_flags(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
