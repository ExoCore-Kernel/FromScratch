<!-- auto-generated -->
# osx_timers_and_clock_reset_timer

**Type:** `osx_timers_and_clock_reset_timer`

**Display label:** reset timer timer id delay

**Kind:** statement (command)

**Category:** Timers and clock

## Arguments

- **timer id** (number) — input slot 1
- **delay** (number) — input slot 2

## Generated C call

```c
blockos_ext_timers_and_clock_reset_timer(/* timer id */, /* delay */);
```

## Runtime prototype

```c
void blockos_ext_timers_and_clock_reset_timer(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_reset_timer(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
