<!-- auto-generated -->
# osx_cpu_pause_cpu_briefly

**Type:** `osx_cpu_pause_cpu_briefly`

**Display label:** pause CPU briefly

**Kind:** statement (command)

**Category:** CPU

## Generated C call

```c
blockos_ext_cpu_pause_cpu_briefly();
```

## Runtime prototype

```c
void blockos_ext_cpu_pause_cpu_briefly(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_cpu_pause_cpu_briefly();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
