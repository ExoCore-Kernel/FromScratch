<!-- auto-generated -->
# osx_interrupts_unregister_interrupt_handler

**Type:** `osx_interrupts_unregister_interrupt_handler`

**Display label:** unregister interrupt handler vector

**Kind:** statement (command)

**Category:** Interrupts

## Arguments

- **vector** (number) — input slot 1

## Generated C call

```c
blockos_ext_interrupts_unregister_interrupt_handler(/* vector */);
```

## Runtime prototype

```c
void blockos_ext_interrupts_unregister_interrupt_handler(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_unregister_interrupt_handler(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
