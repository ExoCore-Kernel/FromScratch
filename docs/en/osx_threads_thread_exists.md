<!-- auto-generated -->
# osx_threads_thread_exists

**Type:** `osx_threads_thread_exists`

**Display label:** thread exists thread id

**Kind:** boolean value

**Category:** Threads

## Arguments

- **thread id** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_threads_thread_exists(/* thread id */)
```

## Runtime prototype

```c
bool blockos_ext_threads_thread_exists(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_threads_thread_exists(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
