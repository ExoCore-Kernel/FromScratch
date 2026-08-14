<!-- auto-generated -->
# osx_interrupts_set_interrupt_priority

**Type:** `osx_interrupts_set_interrupt_priority`

**Display label:** set interrupt priority vector priority

**Kind:** statement (command)

**Category:** Interrupts

## Arguments

- **vector** (number) — input slot 1
- **priority** (number) — input slot 2

## Generated C call

```c
blockos_ext_interrupts_set_interrupt_priority(/* vector */, /* priority */);
```

## Runtime prototype

```c
void blockos_ext_interrupts_set_interrupt_priority(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_set_interrupt_priority(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
