<!-- auto-generated -->
# osx_storage_devices_create_block_request

**Type:** `osx_storage_devices_create_block_request`

**Etichetta visualizzata:** create block request disk lba count buffer

**Tipo blocco:** numero

**Categoria:** Storage devices

## Argomenti

- **disk** (numero) — slot di input 1
- **lba** (numero) — slot di input 2
- **count** (numero) — slot di input 3
- **buffer** (numero) — slot di input 4

## Espressione C generata

```c
(uint64_t) blockos_ext_storage_devices_create_block_request(/* disk */, /* lba */, /* count */, /* buffer */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_storage_devices_create_block_request(uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_create_block_request(0, 0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
