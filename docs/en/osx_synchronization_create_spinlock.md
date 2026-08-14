<!-- auto-generated -->
# osx_synchronization_create_spinlock

**Type:** `osx_synchronization_create_spinlock`

**Display label:** create spinlock

**Kind:** number value

**Category:** Synchronization

## Generated C expression

```c
(uint64_t) blockos_ext_synchronization_create_spinlock()
```

## Runtime prototype

```c
uint64_t blockos_ext_synchronization_create_spinlock(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_synchronization_create_spinlock();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
