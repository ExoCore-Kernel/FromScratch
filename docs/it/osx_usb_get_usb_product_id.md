<!-- auto-generated -->
# osx_usb_get_usb_product_id

**Type:** `osx_usb_get_usb_product_id`

**Etichetta visualizzata:** get USB product id device

**Tipo blocco:** numero

**Categoria:** USB

## Argomenti

- **device** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_usb_get_usb_product_id(/* device */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_usb_get_usb_product_id(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_get_usb_product_id(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
