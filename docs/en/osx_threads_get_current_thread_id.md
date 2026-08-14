<!-- auto-generated -->
# osx_threads_get_current_thread_id

**Type:** `osx_threads_get_current_thread_id`

**Display label:** get current thread id

**Kind:** number value

**Category:** Threads

## Generated C expression

```c
(uint64_t) blockos_ext_threads_get_current_thread_id()
```

## Runtime prototype

```c
uint64_t blockos_ext_threads_get_current_thread_id(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_threads_get_current_thread_id();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
