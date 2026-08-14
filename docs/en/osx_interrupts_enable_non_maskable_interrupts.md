<!-- auto-generated -->
# osx_interrupts_enable_non_maskable_interrupts

**Type:** `osx_interrupts_enable_non_maskable_interrupts`

**Display label:** enable non-maskable interrupts

**Kind:** statement (command)

**Category:** Interrupts

## Generated C call

```c
blockos_ext_interrupts_enable_non_maskable_interrupts();
```

## Runtime prototype

```c
void blockos_ext_interrupts_enable_non_maskable_interrupts(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_enable_non_maskable_interrupts();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
