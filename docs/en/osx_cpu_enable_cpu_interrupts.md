<!-- auto-generated -->
# osx_cpu_enable_cpu_interrupts

**Type:** `osx_cpu_enable_cpu_interrupts`

**Display label:** enable CPU interrupts

**Kind:** statement (command)

**Category:** CPU

## Generated C call

```c
blockos_ext_cpu_enable_cpu_interrupts();
```

## Runtime prototype

```c
void blockos_ext_cpu_enable_cpu_interrupts(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_cpu_enable_cpu_interrupts();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
