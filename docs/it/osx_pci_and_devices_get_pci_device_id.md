<!-- auto-generated -->
# osx_pci_and_devices_get_pci_device_id

**Type:** `osx_pci_and_devices_get_pci_device_id`

**Etichetta visualizzata:** get PCI device id device index

**Tipo blocco:** numero

**Categoria:** PCI and devices

## Argomenti

- **device index** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_pci_and_devices_get_pci_device_id(/* device index */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_pci_and_devices_get_pci_device_id(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_pci_and_devices_get_pci_device_id(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
