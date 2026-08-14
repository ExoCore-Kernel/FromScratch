<!-- auto-generated -->
# osx_usb_get_usb_product_id

**Type:** `osx_usb_get_usb_product_id`

**Display label:** get USB product id device

**Kind:** number value

**Category:** USB

## Arguments

- **device** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_usb_get_usb_product_id(/* device */)
```

## Runtime prototype

```c
uint64_t blockos_ext_usb_get_usb_product_id(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_get_usb_product_id(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
