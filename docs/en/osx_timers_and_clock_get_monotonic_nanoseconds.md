<!-- auto-generated -->
# osx_timers_and_clock_get_monotonic_nanoseconds

**Type:** `osx_timers_and_clock_get_monotonic_nanoseconds`

**Display label:** get monotonic nanoseconds

**Kind:** number value

**Category:** Timers and clock

## Generated C expression

```c
(uint64_t) blockos_ext_timers_and_clock_get_monotonic_nanoseconds()
```

## Runtime prototype

```c
uint64_t blockos_ext_timers_and_clock_get_monotonic_nanoseconds(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_get_monotonic_nanoseconds();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
