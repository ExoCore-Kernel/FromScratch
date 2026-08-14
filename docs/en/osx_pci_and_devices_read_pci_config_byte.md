<!-- auto-generated -->
# osx_pci_and_devices_read_pci_config_byte

**Type:** `osx_pci_and_devices_read_pci_config_byte`

**Display label:** read PCI config byte device index offset

**Kind:** number value

**Category:** PCI and devices

## Arguments

- **device index** (number) — input slot 1
- **offset** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_pci_and_devices_read_pci_config_byte(/* device index */, /* offset */)
```

## Runtime prototype

```c
uint64_t blockos_ext_pci_and_devices_read_pci_config_byte(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_pci_and_devices_read_pci_config_byte(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
