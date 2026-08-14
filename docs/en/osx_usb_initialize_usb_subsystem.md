<!-- auto-generated -->
# osx_usb_initialize_usb_subsystem

**Type:** `osx_usb_initialize_usb_subsystem`

**Display label:** initialize USB subsystem

**Kind:** statement (command)

**Category:** USB

## Generated C call

```c
blockos_ext_usb_initialize_usb_subsystem();
```

## Runtime prototype

```c
void blockos_ext_usb_initialize_usb_subsystem(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_usb_initialize_usb_subsystem();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
