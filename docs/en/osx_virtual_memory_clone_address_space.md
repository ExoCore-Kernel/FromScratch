<!-- auto-generated -->
# osx_virtual_memory_clone_address_space

**Type:** `osx_virtual_memory_clone_address_space`

**Display label:** clone address space source

**Kind:** number value

**Category:** Virtual memory

## Arguments

- **source** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_virtual_memory_clone_address_space(/* source */)
```

## Runtime prototype

```c
uint64_t blockos_ext_virtual_memory_clone_address_space(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_clone_address_space(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
