<!-- auto-generated -->
# osx_pci_and_devices_write_pci_config_byte

**Type:** `osx_pci_and_devices_write_pci_config_byte`

**Display label:** write PCI config byte device index offset value

**Kind:** statement (command)

**Category:** PCI and devices

## Arguments

- **device index** (number) — input slot 1
- **offset** (number) — input slot 2
- **value** (number) — input slot 3

## Generated C call

```c
blockos_ext_pci_and_devices_write_pci_config_byte(/* device index */, /* offset */, /* value */);
```

## Runtime prototype

```c
void blockos_ext_pci_and_devices_write_pci_config_byte(uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_pci_and_devices_write_pci_config_byte(0, 0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
