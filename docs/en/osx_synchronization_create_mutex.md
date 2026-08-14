<!-- auto-generated -->
# osx_synchronization_create_mutex

**Type:** `osx_synchronization_create_mutex`

**Display label:** create mutex

**Kind:** number value

**Category:** Synchronization

## Generated C expression

```c
(uint64_t) blockos_ext_synchronization_create_mutex()
```

## Runtime prototype

```c
uint64_t blockos_ext_synchronization_create_mutex(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_synchronization_create_mutex();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
