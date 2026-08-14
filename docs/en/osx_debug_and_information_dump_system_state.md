<!-- auto-generated -->
# osx_debug_and_information_dump_system_state

**Type:** `osx_debug_and_information_dump_system_state`

**Display label:** dump system state

**Kind:** statement (command)

**Category:** Debug and information

## Generated C call

```c
blockos_ext_debug_and_information_dump_system_state();
```

## Runtime prototype

```c
void blockos_ext_debug_and_information_dump_system_state(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_dump_system_state();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
