<!-- auto-generated -->
# osx_timers_and_clock_convert_ticks_to_milliseconds

**Type:** `osx_timers_and_clock_convert_ticks_to_milliseconds`

**Display label:** convert ticks to milliseconds ticks

**Kind:** number value

**Category:** Timers and clock

## Arguments

- **ticks** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(/* ticks */)
```

## Runtime prototype

```c
uint64_t blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
