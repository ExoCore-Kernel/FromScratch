<!-- auto-generated -->
# osx_interrupts_register_interrupt_handler

**Type:** `osx_interrupts_register_interrupt_handler`

**Display label:** register interrupt handler vector handler address

**Kind:** statement (command)

**Category:** Interrupts

## Arguments

- **vector** (number) — input slot 1
- **handler address** (number) — input slot 2

## Generated C call

```c
blockos_ext_interrupts_register_interrupt_handler(/* vector */, /* handler address */);
```

## Runtime prototype

```c
void blockos_ext_interrupts_register_interrupt_handler(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_register_interrupt_handler(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
