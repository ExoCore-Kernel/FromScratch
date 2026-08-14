<!-- auto-generated -->
# osx_synchronization_signal_semaphore

**Type:** `osx_synchronization_signal_semaphore`

**Display label:** signal semaphore semaphore

**Kind:** statement (command)

**Category:** Synchronization

## Arguments

- **semaphore** (number) — input slot 1

## Generated C call

```c
blockos_ext_synchronization_signal_semaphore(/* semaphore */);
```

## Runtime prototype

```c
void blockos_ext_synchronization_signal_semaphore(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_synchronization_signal_semaphore(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
