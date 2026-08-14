<!-- auto-generated -->
# osx_threads_create_thread

**Type:** `osx_threads_create_thread`

**Display label:** create thread entry address argument

**Kind:** number value

**Category:** Threads

## Arguments

- **entry address** (number) — input slot 1
- **argument** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_threads_create_thread(/* entry address */, /* argument */)
```

## Runtime prototype

```c
uint64_t blockos_ext_threads_create_thread(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_threads_create_thread(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
