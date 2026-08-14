<!-- auto-generated -->
# osx_cpu_invalidate_cpu_cache

**Type:** `osx_cpu_invalidate_cpu_cache`

**Display label:** invalidate CPU cache

**Kind:** statement (command)

**Category:** CPU

## Generated C call

```c
blockos_ext_cpu_invalidate_cpu_cache();
```

## Runtime prototype

```c
void blockos_ext_cpu_invalidate_cpu_cache(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_cpu_invalidate_cpu_cache();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
