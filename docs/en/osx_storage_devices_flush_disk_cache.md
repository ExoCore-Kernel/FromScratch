<!-- auto-generated -->
# osx_storage_devices_flush_disk_cache

**Type:** `osx_storage_devices_flush_disk_cache`

**Display label:** flush disk cache disk

**Kind:** statement (command)

**Category:** Storage devices

## Arguments

- **disk** (number) — input slot 1

## Generated C call

```c
blockos_ext_storage_devices_flush_disk_cache(/* disk */);
```

## Runtime prototype

```c
void blockos_ext_storage_devices_flush_disk_cache(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_storage_devices_flush_disk_cache(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
