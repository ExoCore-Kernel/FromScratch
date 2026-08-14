<!-- auto-generated -->
# osx_interrupts_install_interrupt_table

**Type:** `osx_interrupts_install_interrupt_table`

**Display label:** install interrupt table

**Kind:** statement (command)

**Category:** Interrupts

## Generated C call

```c
blockos_ext_interrupts_install_interrupt_table();
```

## Runtime prototype

```c
void blockos_ext_interrupts_install_interrupt_table(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_install_interrupt_table();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
