<!-- auto-generated -->
# osx_storage_devices_get_partition_count

**Type:** `osx_storage_devices_get_partition_count`

**Display label:** get partition count disk

**Kind:** number value

**Category:** Storage devices

## Arguments

- **disk** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_storage_devices_get_partition_count(/* disk */)
```

## Runtime prototype

```c
uint64_t blockos_ext_storage_devices_get_partition_count(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_get_partition_count(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
