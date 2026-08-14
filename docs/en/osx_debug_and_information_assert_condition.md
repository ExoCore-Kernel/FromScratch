<!-- auto-generated -->
# osx_debug_and_information_assert_condition

**Type:** `osx_debug_and_information_assert_condition`

**Display label:** assert condition condition message

**Kind:** statement (command)

**Category:** Debug and information

## Arguments

- **condition** (boolean) — input slot 1
- **message** (string) — input slot 2

## Generated C call

```c
blockos_ext_debug_and_information_assert_condition(/* condition */, /* message */);
```

## Runtime prototype

```c
void blockos_ext_debug_and_information_assert_condition(bool, const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_assert_condition(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
