<!-- auto-generated -->
# osx_cpu_cpu_interrupts_enabled

**Type:** `osx_cpu_cpu_interrupts_enabled`

**Display label:** CPU interrupts enabled

**Kind:** boolean value

**Category:** CPU

## Generated C expression

```c
(bool) blockos_ext_cpu_cpu_interrupts_enabled()
```

## Runtime prototype

```c
bool blockos_ext_cpu_cpu_interrupts_enabled(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_cpu_interrupts_enabled();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
