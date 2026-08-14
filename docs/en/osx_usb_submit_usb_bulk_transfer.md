<!-- auto-generated -->
# osx_usb_submit_usb_bulk_transfer

**Type:** `osx_usb_submit_usb_bulk_transfer`

**Display label:** submit USB bulk transfer device endpoint buffer length

**Kind:** number value

**Category:** USB

## Arguments

- **device** (number) — input slot 1
- **endpoint** (number) — input slot 2
- **buffer** (number) — input slot 3
- **length** (number) — input slot 4

## Generated C expression

```c
(uint64_t) blockos_ext_usb_submit_usb_bulk_transfer(/* device */, /* endpoint */, /* buffer */, /* length */)
```

## Runtime prototype

```c
uint64_t blockos_ext_usb_submit_usb_bulk_transfer(uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_submit_usb_bulk_transfer(0, 0, 0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
