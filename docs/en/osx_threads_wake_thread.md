<!-- auto-generated -->
# osx_threads_wake_thread

**Type:** `osx_threads_wake_thread`

**Display label:** wake thread thread id

**Kind:** statement (command)

**Category:** Threads

## Arguments

- **thread id** (number) — input slot 1

## Generated C call

```c
blockos_ext_threads_wake_thread(/* thread id */);
```

## Runtime prototype

```c
void blockos_ext_threads_wake_thread(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_threads_wake_thread(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
