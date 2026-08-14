<!-- auto-generated -->
# osx_debug_and_information_clear_last_error

**Type:** `osx_debug_and_information_clear_last_error`

**Display label:** clear last error

**Kind:** statement (command)

**Category:** Debug and information

## Generated C call

```c
blockos_ext_debug_and_information_clear_last_error();
```

## Runtime prototype

```c
void blockos_ext_debug_and_information_clear_last_error(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_clear_last_error();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
