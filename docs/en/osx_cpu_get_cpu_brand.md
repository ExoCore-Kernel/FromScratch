<!-- auto-generated -->
# osx_cpu_get_cpu_brand

**Type:** `osx_cpu_get_cpu_brand`

**Display label:** get CPU brand

**Kind:** string value

**Category:** CPU

## Generated C expression

```c
(const char *) blockos_ext_cpu_get_cpu_brand()
```

## Runtime prototype

```c
const char * blockos_ext_cpu_get_cpu_brand(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_get_cpu_brand();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
