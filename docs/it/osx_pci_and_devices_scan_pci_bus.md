<!-- auto-generated -->
# osx_pci_and_devices_scan_pci_bus

**Type:** `osx_pci_and_devices_scan_pci_bus`

**Etichetta visualizzata:** scan PCI bus

**Tipo blocco:** comando

**Categoria:** PCI and devices

## Chiamata C generata

```c
blockos_ext_pci_and_devices_scan_pci_bus();
```

## Prototipo runtime

```c
void blockos_ext_pci_and_devices_scan_pci_bus(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_pci_and_devices_scan_pci_bus();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
