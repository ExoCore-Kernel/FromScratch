<!-- auto-generated -->
# osx_interrupts_mask_hardware_irq

**Type:** `osx_interrupts_mask_hardware_irq`

**Display label:** mask hardware IRQ irq

**Kind:** statement (command)

**Category:** Interrupts

## Arguments

- **irq** (number) — input slot 1

## Generated C call

```c
blockos_ext_interrupts_mask_hardware_irq(/* irq */);
```

## Runtime prototype

```c
void blockos_ext_interrupts_mask_hardware_irq(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_mask_hardware_irq(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
