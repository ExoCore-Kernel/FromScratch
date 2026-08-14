<!-- auto-generated -->
# osx_storage_devices_get_disk_sector_size

**Type:** `osx_storage_devices_get_disk_sector_size`

**Etichetta visualizzata:** get disk sector size disk

**Tipo blocco:** numero

**Categoria:** Storage devices

## Argomenti

- **disk** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_storage_devices_get_disk_sector_size(/* disk */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_storage_devices_get_disk_sector_size(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_get_disk_sector_size(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
