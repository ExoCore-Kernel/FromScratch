<!-- auto-generated -->
# osx_storage_devices_get_disk_sector_size

**Type:** `osx_storage_devices_get_disk_sector_size`

**Display label:** get disk sector size disk

**Kind:** number value

**Category:** Storage devices

## Arguments

- **disk** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_storage_devices_get_disk_sector_size(/* disk */)
```

## Runtime prototype

```c
uint64_t blockos_ext_storage_devices_get_disk_sector_size(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_get_disk_sector_size(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
