<!-- auto-generated -->
# osx_storage_devices_wait_for_block_request

**Type:** `osx_storage_devices_wait_for_block_request`

**Display label:** wait for block request request

**Kind:** number value

**Category:** Storage devices

## Arguments

- **request** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_storage_devices_wait_for_block_request(/* request */)
```

## Runtime prototype

```c
uint64_t blockos_ext_storage_devices_wait_for_block_request(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_wait_for_block_request(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
