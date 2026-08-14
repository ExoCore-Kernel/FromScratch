<!-- auto-generated -->
# osx_timers_and_clock_set_wall_clock_seconds

**Type:** `osx_timers_and_clock_set_wall_clock_seconds`

**Display label:** set wall clock seconds seconds

**Kind:** statement (command)

**Category:** Timers and clock

## Arguments

- **seconds** (number) — input slot 1

## Generated C call

```c
blockos_ext_timers_and_clock_set_wall_clock_seconds(/* seconds */);
```

## Runtime prototype

```c
void blockos_ext_timers_and_clock_set_wall_clock_seconds(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_set_wall_clock_seconds(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
