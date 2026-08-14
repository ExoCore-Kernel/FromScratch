<!-- auto-generated -->
# osx_pci_and_devices_get_pci_device_id

**Type:** `osx_pci_and_devices_get_pci_device_id`

**Display label:** get PCI device id device index

**Kind:** number value

**Category:** PCI and devices

## Arguments

- **device index** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_pci_and_devices_get_pci_device_id(/* device index */)
```

## Runtime prototype

```c
uint64_t blockos_ext_pci_and_devices_get_pci_device_id(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_pci_and_devices_get_pci_device_id(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
