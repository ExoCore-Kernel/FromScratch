<!-- auto-generated -->
# osx_timers_and_clock_timer_is_active

**Type:** `osx_timers_and_clock_timer_is_active`

**Display label:** timer is active timer id

**Kind:** boolean value

**Category:** Timers and clock

## Arguments

- **timer id** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_timers_and_clock_timer_is_active(/* timer id */)
```

## Runtime prototype

```c
bool blockos_ext_timers_and_clock_timer_is_active(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_timer_is_active(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
