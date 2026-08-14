<!-- auto-generated -->
# osx_threads_yield_current_thread

**Type:** `osx_threads_yield_current_thread`

**Display label:** yield current thread

**Kind:** statement (command)

**Category:** Threads

## Generated C call

```c
blockos_ext_threads_yield_current_thread();
```

## Runtime prototype

```c
void blockos_ext_threads_yield_current_thread(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_threads_yield_current_thread();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
