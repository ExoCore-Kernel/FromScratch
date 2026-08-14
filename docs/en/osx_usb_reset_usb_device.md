<!-- auto-generated -->
# osx_usb_reset_usb_device

**Type:** `osx_usb_reset_usb_device`

**Display label:** reset USB device device

**Kind:** number value

**Category:** USB

## Arguments

- **device** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_usb_reset_usb_device(/* device */)
```

## Runtime prototype

```c
uint64_t blockos_ext_usb_reset_usb_device(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_reset_usb_device(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
