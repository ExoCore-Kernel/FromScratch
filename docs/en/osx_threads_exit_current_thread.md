<!-- auto-generated -->
# osx_threads_exit_current_thread

**Type:** `osx_threads_exit_current_thread`

**Display label:** exit current thread exit code

**Kind:** statement (command)

**Category:** Threads

## Arguments

- **exit code** (number) — input slot 1

## Generated C call

```c
blockos_ext_threads_exit_current_thread(/* exit code */);
```

## Runtime prototype

```c
void blockos_ext_threads_exit_current_thread(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_threads_exit_current_thread(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
