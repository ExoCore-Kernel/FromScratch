<!-- auto-generated -->
# osx_cpu_get_cpu_frequency_khz

**Type:** `osx_cpu_get_cpu_frequency_khz`

**Display label:** get CPU frequency kHz

**Kind:** number value

**Category:** CPU

## Generated C expression

```c
(uint64_t) blockos_ext_cpu_get_cpu_frequency_khz()
```

## Runtime prototype

```c
uint64_t blockos_ext_cpu_get_cpu_frequency_khz(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_get_cpu_frequency_khz();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
