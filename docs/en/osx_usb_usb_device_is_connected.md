<!-- auto-generated -->
# osx_usb_usb_device_is_connected

**Type:** `osx_usb_usb_device_is_connected`

**Display label:** USB device is connected device

**Kind:** boolean value

**Category:** USB

## Arguments

- **device** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_usb_usb_device_is_connected(/* device */)
```

## Runtime prototype

```c
bool blockos_ext_usb_usb_device_is_connected(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_usb_device_is_connected(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
