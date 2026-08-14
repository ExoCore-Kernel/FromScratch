<!-- auto-generated -->
# osx_interrupts_allocate_interrupt_vector

**Type:** `osx_interrupts_allocate_interrupt_vector`

**Display label:** allocate interrupt vector

**Kind:** number value

**Category:** Interrupts

## Generated C expression

```c
(uint64_t) blockos_ext_interrupts_allocate_interrupt_vector()
```

## Runtime prototype

```c
uint64_t blockos_ext_interrupts_allocate_interrupt_vector(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_interrupts_allocate_interrupt_vector();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
