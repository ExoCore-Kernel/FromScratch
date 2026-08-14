<!-- auto-generated -->
# osx_storage_devices_flush_disk_cache

**Type:** `osx_storage_devices_flush_disk_cache`

**Etichetta visualizzata:** flush disk cache disk

**Tipo blocco:** comando

**Categoria:** Storage devices

## Argomenti

- **disk** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_storage_devices_flush_disk_cache(/* disk */);
```

## Prototipo runtime

```c
void blockos_ext_storage_devices_flush_disk_cache(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_storage_devices_flush_disk_cache(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
