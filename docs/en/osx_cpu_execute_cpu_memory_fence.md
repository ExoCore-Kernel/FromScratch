<!-- auto-generated -->
# osx_cpu_execute_cpu_memory_fence

**Type:** `osx_cpu_execute_cpu_memory_fence`

**Display label:** execute CPU memory fence

**Kind:** statement (command)

**Category:** CPU

## Generated C call

```c
blockos_ext_cpu_execute_cpu_memory_fence();
```

## Runtime prototype

```c
void blockos_ext_cpu_execute_cpu_memory_fence(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_cpu_execute_cpu_memory_fence();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
