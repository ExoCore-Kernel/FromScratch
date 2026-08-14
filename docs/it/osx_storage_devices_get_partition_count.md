<!-- auto-generated -->
# osx_storage_devices_get_partition_count

**Type:** `osx_storage_devices_get_partition_count`

**Etichetta visualizzata:** get partition count disk

**Tipo blocco:** numero

**Categoria:** Storage devices

## Argomenti

- **disk** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_storage_devices_get_partition_count(/* disk */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_storage_devices_get_partition_count(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_get_partition_count(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
