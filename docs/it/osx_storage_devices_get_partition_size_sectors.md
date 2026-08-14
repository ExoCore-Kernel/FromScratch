<!-- auto-generated -->
# osx_storage_devices_get_partition_size_sectors

**Type:** `osx_storage_devices_get_partition_size_sectors`

**Etichetta visualizzata:** get partition size sectors disk partition

**Tipo blocco:** numero

**Categoria:** Storage devices

## Argomenti

- **disk** (numero) — slot di input 1
- **partition** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_storage_devices_get_partition_size_sectors(/* disk */, /* partition */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_storage_devices_get_partition_size_sectors(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_get_partition_size_sectors(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
