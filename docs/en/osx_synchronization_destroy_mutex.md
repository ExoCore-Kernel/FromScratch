<!-- auto-generated -->
# osx_synchronization_destroy_mutex

**Type:** `osx_synchronization_destroy_mutex`

**Display label:** destroy mutex mutex

**Kind:** statement (command)

**Category:** Synchronization

## Arguments

- **mutex** (number) — input slot 1

## Generated C call

```c
blockos_ext_synchronization_destroy_mutex(/* mutex */);
```

## Runtime prototype

```c
void blockos_ext_synchronization_destroy_mutex(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_synchronization_destroy_mutex(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
