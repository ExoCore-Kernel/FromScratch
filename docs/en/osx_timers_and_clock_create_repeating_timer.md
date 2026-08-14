<!-- auto-generated -->
# osx_timers_and_clock_create_repeating_timer

**Type:** `osx_timers_and_clock_create_repeating_timer`

**Display label:** create repeating timer period callback address

**Kind:** number value

**Category:** Timers and clock

## Arguments

- **period** (number) — input slot 1
- **callback address** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_timers_and_clock_create_repeating_timer(/* period */, /* callback address */)
```

## Runtime prototype

```c
uint64_t blockos_ext_timers_and_clock_create_repeating_timer(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_create_repeating_timer(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
