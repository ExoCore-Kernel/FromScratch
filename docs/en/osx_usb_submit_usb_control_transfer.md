<!-- auto-generated -->
# osx_usb_submit_usb_control_transfer

**Type:** `osx_usb_submit_usb_control_transfer`

**Display label:** submit USB control transfer device request value index length

**Kind:** number value

**Category:** USB

## Arguments

- **device** (number) — input slot 1
- **request** (number) — input slot 2
- **value** (number) — input slot 3
- **index** (number) — input slot 4
- **length** (number) — input slot 5

## Generated C expression

```c
(uint64_t) blockos_ext_usb_submit_usb_control_transfer(/* device */, /* request */, /* value */, /* index */, /* length */)
```

## Runtime prototype

```c
uint64_t blockos_ext_usb_submit_usb_control_transfer(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_submit_usb_control_transfer(0, 0, 0, 0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
