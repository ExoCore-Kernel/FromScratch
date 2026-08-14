<!-- auto-generated -->
# osx_timers_and_clock_convert_milliseconds_to_ticks

**Type:** `osx_timers_and_clock_convert_milliseconds_to_ticks`

**Display label:** convert milliseconds to ticks milliseconds

**Kind:** number value

**Category:** Timers and clock

## Arguments

- **milliseconds** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_timers_and_clock_convert_milliseconds_to_ticks(/* milliseconds */)
```

## Runtime prototype

```c
uint64_t blockos_ext_timers_and_clock_convert_milliseconds_to_ticks(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_convert_milliseconds_to_ticks(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
