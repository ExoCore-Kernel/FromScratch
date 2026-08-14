<!-- auto-generated -->
# osx_interrupts_hardware_irq_is_masked

**Type:** `osx_interrupts_hardware_irq_is_masked`

**Display label:** hardware IRQ is masked irq

**Kind:** boolean value

**Category:** Interrupts

## Arguments

- **irq** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_interrupts_hardware_irq_is_masked(/* irq */)
```

## Runtime prototype

```c
bool blockos_ext_interrupts_hardware_irq_is_masked(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_interrupts_hardware_irq_is_masked(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
