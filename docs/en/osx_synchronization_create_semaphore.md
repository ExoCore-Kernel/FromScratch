<!-- auto-generated -->
# osx_synchronization_create_semaphore

**Type:** `osx_synchronization_create_semaphore`

**Display label:** create semaphore initial value

**Kind:** number value

**Category:** Synchronization

## Arguments

- **initial value** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_synchronization_create_semaphore(/* initial value */)
```

## Runtime prototype

```c
uint64_t blockos_ext_synchronization_create_semaphore(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_synchronization_create_semaphore(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
