<!-- auto-generated -->
# osx_physical_memory_zero_physical_page

**Type:** `osx_physical_memory_zero_physical_page`

**Display label:** zero physical page address

**Kind:** statement (command)

**Category:** Physical memory

## Arguments

- **address** (number) — input slot 1

## Generated C call

```c
blockos_ext_physical_memory_zero_physical_page(/* address */);
```

## Runtime prototype

```c
void blockos_ext_physical_memory_zero_physical_page(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_physical_memory_zero_physical_page(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
