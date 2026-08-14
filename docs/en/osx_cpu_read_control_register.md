<!-- auto-generated -->
# osx_cpu_read_control_register

**Type:** `osx_cpu_read_control_register`

**Display label:** read control register register

**Kind:** number value

**Category:** CPU

## Arguments

- **register** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_cpu_read_control_register(/* register */)
```

## Runtime prototype

```c
uint64_t blockos_ext_cpu_read_control_register(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_read_control_register(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
