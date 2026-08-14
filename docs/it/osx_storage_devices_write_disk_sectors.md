<!-- auto-generated -->
# osx_storage_devices_write_disk_sectors

**Type:** `osx_storage_devices_write_disk_sectors`

**Etichetta visualizzata:** write disk sectors disk lba buffer count

**Tipo blocco:** numero

**Categoria:** Storage devices

## Argomenti

- **disk** (numero) — slot di input 1
- **lba** (numero) — slot di input 2
- **buffer** (numero) — slot di input 3
- **count** (numero) — slot di input 4

## Espressione C generata

```c
(uint64_t) blockos_ext_storage_devices_write_disk_sectors(/* disk */, /* lba */, /* buffer */, /* count */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_storage_devices_write_disk_sectors(uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_write_disk_sectors(0, 0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
