<!-- auto-generated -->
# osx_virtual_memory_translate_virtual_address

**Type:** `osx_virtual_memory_translate_virtual_address`

**Display label:** translate virtual address virtual

**Kind:** number value

**Category:** Virtual memory

## Arguments

- **virtual** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_virtual_memory_translate_virtual_address(/* virtual */)
```

## Runtime prototype

```c
uint64_t blockos_ext_virtual_memory_translate_virtual_address(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_translate_virtual_address(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
