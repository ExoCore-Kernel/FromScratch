<!-- auto-generated -->
# osx_storage_devices_disk_is_present

**Type:** `osx_storage_devices_disk_is_present`

**Display label:** disk is present disk

**Kind:** boolean value

**Category:** Storage devices

## Arguments

- **disk** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_storage_devices_disk_is_present(/* disk */)
```

## Runtime prototype

```c
bool blockos_ext_storage_devices_disk_is_present(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_disk_is_present(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
