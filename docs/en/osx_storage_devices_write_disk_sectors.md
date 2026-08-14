<!-- auto-generated -->
# osx_storage_devices_write_disk_sectors

**Type:** `osx_storage_devices_write_disk_sectors`

**Display label:** write disk sectors disk lba buffer count

**Kind:** number value

**Category:** Storage devices

## Arguments

- **disk** (number) — input slot 1
- **lba** (number) — input slot 2
- **buffer** (number) — input slot 3
- **count** (number) — input slot 4

## Generated C expression

```c
(uint64_t) blockos_ext_storage_devices_write_disk_sectors(/* disk */, /* lba */, /* buffer */, /* count */)
```

## Runtime prototype

```c
uint64_t blockos_ext_storage_devices_write_disk_sectors(uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_write_disk_sectors(0, 0, 0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
