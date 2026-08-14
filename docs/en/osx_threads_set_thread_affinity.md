<!-- auto-generated -->
# osx_threads_set_thread_affinity

**Type:** `osx_threads_set_thread_affinity`

**Display label:** set thread affinity thread id cpu

**Kind:** statement (command)

**Category:** Threads

## Arguments

- **thread id** (number) — input slot 1
- **cpu** (number) — input slot 2

## Generated C call

```c
blockos_ext_threads_set_thread_affinity(/* thread id */, /* cpu */);
```

## Runtime prototype

```c
void blockos_ext_threads_set_thread_affinity(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_threads_set_thread_affinity(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
