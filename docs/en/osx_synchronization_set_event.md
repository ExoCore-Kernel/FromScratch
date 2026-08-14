<!-- auto-generated -->
# osx_synchronization_set_event

**Type:** `osx_synchronization_set_event`

**Display label:** set event event

**Kind:** statement (command)

**Category:** Synchronization

## Arguments

- **event** (number) — input slot 1

## Generated C call

```c
blockos_ext_synchronization_set_event(/* event */);
```

## Runtime prototype

```c
void blockos_ext_synchronization_set_event(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_synchronization_set_event(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
