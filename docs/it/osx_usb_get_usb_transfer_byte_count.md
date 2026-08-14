<!-- auto-generated -->
# osx_usb_get_usb_transfer_byte_count

**Type:** `osx_usb_get_usb_transfer_byte_count`

**Etichetta visualizzata:** get USB transfer byte count transfer

**Tipo blocco:** numero

**Categoria:** USB

## Argomenti

- **transfer** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_usb_get_usb_transfer_byte_count(/* transfer */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_usb_get_usb_transfer_byte_count(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_get_usb_transfer_byte_count(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
