<!-- auto-generated -->
# osx_timers_and_clock_initialize_system_timer

**Type:** `osx_timers_and_clock_initialize_system_timer`

**Display label:** initialize system timer frequency

**Kind:** statement (command)

**Category:** Timers and clock

## Arguments

- **frequency** (number) — input slot 1

## Generated C call

```c
blockos_ext_timers_and_clock_initialize_system_timer(/* frequency */);
```

## Runtime prototype

```c
void blockos_ext_timers_and_clock_initialize_system_timer(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_initialize_system_timer(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
