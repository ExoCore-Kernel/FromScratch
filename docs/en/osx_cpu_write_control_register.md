<!-- auto-generated -->
# osx_cpu_write_control_register

**Type:** `osx_cpu_write_control_register`

**Display label:** write control register register value

**Kind:** statement (command)

**Category:** CPU

## Arguments

- **register** (number) — input slot 1
- **value** (number) — input slot 2

## Generated C call

```c
blockos_ext_cpu_write_control_register(/* register */, /* value */);
```

## Runtime prototype

```c
void blockos_ext_cpu_write_control_register(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_cpu_write_control_register(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
