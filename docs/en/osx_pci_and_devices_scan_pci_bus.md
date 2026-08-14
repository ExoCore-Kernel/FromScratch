<!-- auto-generated -->
# osx_pci_and_devices_scan_pci_bus

**Type:** `osx_pci_and_devices_scan_pci_bus`

**Display label:** scan PCI bus

**Kind:** statement (command)

**Category:** PCI and devices

## Generated C call

```c
blockos_ext_pci_and_devices_scan_pci_bus();
```

## Runtime prototype

```c
void blockos_ext_pci_and_devices_scan_pci_bus(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_pci_and_devices_scan_pci_bus();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
