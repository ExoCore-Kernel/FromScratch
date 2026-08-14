<!-- auto-generated -->
# osx_timers_and_clock_cancel_timer

**Type:** `osx_timers_and_clock_cancel_timer`

**Display label:** cancel timer timer id

**Kind:** statement (command)

**Category:** Timers and clock

## Arguments

- **timer id** (number) — input slot 1

## Generated C call

```c
blockos_ext_timers_and_clock_cancel_timer(/* timer id */);
```

## Runtime prototype

```c
void blockos_ext_timers_and_clock_cancel_timer(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_cancel_timer(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
