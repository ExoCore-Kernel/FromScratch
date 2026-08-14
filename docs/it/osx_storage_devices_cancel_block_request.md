<!-- auto-generated -->
# osx_storage_devices_cancel_block_request

**Type:** `osx_storage_devices_cancel_block_request`

**Etichetta visualizzata:** cancel block request request

**Tipo blocco:** comando

**Categoria:** Storage devices

## Argomenti

- **request** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_storage_devices_cancel_block_request(/* request */);
```

## Prototipo runtime

```c
void blockos_ext_storage_devices_cancel_block_request(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_storage_devices_cancel_block_request(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
