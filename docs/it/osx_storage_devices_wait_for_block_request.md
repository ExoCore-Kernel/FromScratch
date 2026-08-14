<!-- auto-generated -->
# osx_storage_devices_wait_for_block_request

**Type:** `osx_storage_devices_wait_for_block_request`

**Etichetta visualizzata:** wait for block request request

**Tipo blocco:** numero

**Categoria:** Storage devices

## Argomenti

- **request** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_storage_devices_wait_for_block_request(/* request */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_storage_devices_wait_for_block_request(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_wait_for_block_request(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
