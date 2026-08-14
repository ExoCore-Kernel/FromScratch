<!-- auto-generated -->
# osx_cpu_flush_cache_line

**Type:** `osx_cpu_flush_cache_line`

**Display label:** flush cache line address

**Kind:** statement (command)

**Category:** CPU

## Arguments

- **address** (number) — input slot 1

## Generated C call

```c
blockos_ext_cpu_flush_cache_line(/* address */);
```

## Runtime prototype

```c
void blockos_ext_cpu_flush_cache_line(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_cpu_flush_cache_line(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
