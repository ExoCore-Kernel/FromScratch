<!-- auto-generated -->
# osx_cpu_get_current_cpu_number

**Type:** `osx_cpu_get_current_cpu_number`

**Display label:** get current CPU number

**Kind:** number value

**Category:** CPU

## Generated C expression

```c
(uint64_t) blockos_ext_cpu_get_current_cpu_number()
```

## Runtime prototype

```c
uint64_t blockos_ext_cpu_get_current_cpu_number(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_get_current_cpu_number();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
