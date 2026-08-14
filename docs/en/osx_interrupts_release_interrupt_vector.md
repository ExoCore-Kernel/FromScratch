<!-- auto-generated -->
# osx_interrupts_release_interrupt_vector

**Type:** `osx_interrupts_release_interrupt_vector`

**Display label:** release interrupt vector vector

**Kind:** statement (command)

**Category:** Interrupts

## Arguments

- **vector** (number) — input slot 1

## Generated C call

```c
blockos_ext_interrupts_release_interrupt_vector(/* vector */);
```

## Runtime prototype

```c
void blockos_ext_interrupts_release_interrupt_vector(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_release_interrupt_vector(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
