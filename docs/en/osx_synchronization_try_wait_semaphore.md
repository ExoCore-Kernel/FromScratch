<!-- auto-generated -->
# osx_synchronization_try_wait_semaphore

**Type:** `osx_synchronization_try_wait_semaphore`

**Display label:** try wait semaphore semaphore

**Kind:** boolean value

**Category:** Synchronization

## Arguments

- **semaphore** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_synchronization_try_wait_semaphore(/* semaphore */)
```

## Runtime prototype

```c
bool blockos_ext_synchronization_try_wait_semaphore(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_synchronization_try_wait_semaphore(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
