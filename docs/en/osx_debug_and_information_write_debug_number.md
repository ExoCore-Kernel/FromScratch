<!-- auto-generated -->
# osx_debug_and_information_write_debug_number

**Type:** `osx_debug_and_information_write_debug_number`

**Display label:** write debug number value

**Kind:** statement (command)

**Category:** Debug and information

## Arguments

- **value** (number) — input slot 1

## Generated C call

```c
blockos_ext_debug_and_information_write_debug_number(/* value */);
```

## Runtime prototype

```c
void blockos_ext_debug_and_information_write_debug_number(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_write_debug_number(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
