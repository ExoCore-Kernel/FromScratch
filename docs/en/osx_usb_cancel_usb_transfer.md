<!-- auto-generated -->
# osx_usb_cancel_usb_transfer

**Type:** `osx_usb_cancel_usb_transfer`

**Display label:** cancel USB transfer transfer

**Kind:** statement (command)

**Category:** USB

## Arguments

- **transfer** (number) — input slot 1

## Generated C call

```c
blockos_ext_usb_cancel_usb_transfer(/* transfer */);
```

## Runtime prototype

```c
void blockos_ext_usb_cancel_usb_transfer(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_usb_cancel_usb_transfer(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
