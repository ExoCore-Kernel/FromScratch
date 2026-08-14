<!-- auto-generated -->
# osx_storage_devices_get_block_request_status

**Type:** `osx_storage_devices_get_block_request_status`

**Display label:** get block request status request

**Kind:** number value

**Category:** Storage devices

## Arguments

- **request** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_storage_devices_get_block_request_status(/* request */)
```

## Runtime prototype

```c
uint64_t blockos_ext_storage_devices_get_block_request_status(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_get_block_request_status(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
