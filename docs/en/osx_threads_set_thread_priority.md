<!-- auto-generated -->
# osx_threads_set_thread_priority

**Type:** `osx_threads_set_thread_priority`

**Display label:** set thread priority thread id priority

**Kind:** statement (command)

**Category:** Threads

## Arguments

- **thread id** (number) — input slot 1
- **priority** (number) — input slot 2

## Generated C call

```c
blockos_ext_threads_set_thread_priority(/* thread id */, /* priority */);
```

## Runtime prototype

```c
void blockos_ext_threads_set_thread_priority(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_threads_set_thread_priority(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
