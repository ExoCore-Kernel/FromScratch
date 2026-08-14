<!-- auto-generated -->
# osx_timers_and_clock_get_timer_remaining_ticks

**Type:** `osx_timers_and_clock_get_timer_remaining_ticks`

**Display label:** get timer remaining ticks timer id

**Kind:** number value

**Category:** Timers and clock

## Arguments

- **timer id** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_timers_and_clock_get_timer_remaining_ticks(/* timer id */)
```

## Runtime prototype

```c
uint64_t blockos_ext_timers_and_clock_get_timer_remaining_ticks(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_get_timer_remaining_ticks(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
