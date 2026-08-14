<!-- auto-generated -->
# osx_pci_and_devices_enable_pci_bus_mastering

**Type:** `osx_pci_and_devices_enable_pci_bus_mastering`

**Etichetta visualizzata:** enable PCI bus mastering device index

**Tipo blocco:** comando

**Categoria:** PCI and devices

## Argomenti

- **device index** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_pci_and_devices_enable_pci_bus_mastering(/* device index */);
```

## Prototipo runtime

```c
void blockos_ext_pci_and_devices_enable_pci_bus_mastering(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_pci_and_devices_enable_pci_bus_mastering(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
