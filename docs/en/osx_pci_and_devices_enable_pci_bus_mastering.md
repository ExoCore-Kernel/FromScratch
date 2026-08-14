<!-- auto-generated -->
# osx_pci_and_devices_enable_pci_bus_mastering

**Type:** `osx_pci_and_devices_enable_pci_bus_mastering`

**Display label:** enable PCI bus mastering device index

**Kind:** statement (command)

**Category:** PCI and devices

## Arguments

- **device index** (number) — input slot 1

## Generated C call

```c
blockos_ext_pci_and_devices_enable_pci_bus_mastering(/* device index */);
```

## Runtime prototype

```c
void blockos_ext_pci_and_devices_enable_pci_bus_mastering(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_pci_and_devices_enable_pci_bus_mastering(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
