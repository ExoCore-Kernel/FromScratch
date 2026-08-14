<!-- auto-generated -->
# osx_interrupts_trigger_software_interrupt

**Type:** `osx_interrupts_trigger_software_interrupt`

**Display label:** trigger software interrupt vector

**Kind:** statement (command)

**Category:** Interrupts

## Arguments

- **vector** (number) — input slot 1

## Generated C call

```c
blockos_ext_interrupts_trigger_software_interrupt(/* vector */);
```

## Runtime prototype

```c
void blockos_ext_interrupts_trigger_software_interrupt(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_interrupts_trigger_software_interrupt(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
