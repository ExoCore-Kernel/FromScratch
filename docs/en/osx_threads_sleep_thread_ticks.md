<!-- auto-generated -->
# osx_threads_sleep_thread_ticks

**Type:** `osx_threads_sleep_thread_ticks`

**Display label:** sleep thread ticks ticks

**Kind:** statement (command)

**Category:** Threads

## Arguments

- **ticks** (number) — input slot 1

## Generated C call

```c
blockos_ext_threads_sleep_thread_ticks(/* ticks */);
```

## Runtime prototype

```c
void blockos_ext_threads_sleep_thread_ticks(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_threads_sleep_thread_ticks(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
