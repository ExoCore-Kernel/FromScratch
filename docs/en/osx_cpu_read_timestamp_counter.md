<!-- auto-generated -->
# osx_cpu_read_timestamp_counter

**Type:** `osx_cpu_read_timestamp_counter`

**Display label:** read timestamp counter

**Kind:** number value

**Category:** CPU

## Generated C expression

```c
(uint64_t) blockos_ext_cpu_read_timestamp_counter()
```

## Runtime prototype

```c
uint64_t blockos_ext_cpu_read_timestamp_counter(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_read_timestamp_counter();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
