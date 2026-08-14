<!-- auto-generated -->
# osx_threads_join_thread

**Type:** `osx_threads_join_thread`

**Display label:** join thread thread id

**Kind:** number value

**Category:** Threads

## Arguments

- **thread id** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_threads_join_thread(/* thread id */)
```

## Runtime prototype

```c
uint64_t blockos_ext_threads_join_thread(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_threads_join_thread(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
