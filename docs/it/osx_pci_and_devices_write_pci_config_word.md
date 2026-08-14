<!-- auto-generated -->
# osx_pci_and_devices_write_pci_config_word

**Type:** `osx_pci_and_devices_write_pci_config_word`

**Etichetta visualizzata:** write PCI config word device index offset value

**Tipo blocco:** comando

**Categoria:** PCI and devices

## Argomenti

- **device index** (numero) — slot di input 1
- **offset** (numero) — slot di input 2
- **value** (numero) — slot di input 3

## Chiamata C generata

```c
blockos_ext_pci_and_devices_write_pci_config_word(/* device index */, /* offset */, /* value */);
```

## Prototipo runtime

```c
void blockos_ext_pci_and_devices_write_pci_config_word(uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_pci_and_devices_write_pci_config_word(0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
