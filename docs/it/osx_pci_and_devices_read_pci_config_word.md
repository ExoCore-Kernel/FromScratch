<!-- auto-generated -->
# osx_pci_and_devices_read_pci_config_word

**Type:** `osx_pci_and_devices_read_pci_config_word`

**Etichetta visualizzata:** read PCI config word device index offset

**Tipo blocco:** numero

**Categoria:** PCI and devices

## Argomenti

- **device index** (numero) — slot di input 1
- **offset** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_pci_and_devices_read_pci_config_word(/* device index */, /* offset */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_pci_and_devices_read_pci_config_word(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_pci_and_devices_read_pci_config_word(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
