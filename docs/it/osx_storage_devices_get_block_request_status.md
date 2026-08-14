<!-- auto-generated -->
# osx_storage_devices_get_block_request_status

**Type:** `osx_storage_devices_get_block_request_status`

**Etichetta visualizzata:** get block request status request

**Tipo blocco:** numero

**Categoria:** Storage devices

## Argomenti

- **request** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_storage_devices_get_block_request_status(/* request */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_storage_devices_get_block_request_status(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_get_block_request_status(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
