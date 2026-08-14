<!-- auto-generated -->
# osx_usb_submit_usb_control_transfer

**Type:** `osx_usb_submit_usb_control_transfer`

**Etichetta visualizzata:** submit USB control transfer device request value index length

**Tipo blocco:** numero

**Categoria:** USB

## Argomenti

- **device** (numero) — slot di input 1
- **request** (numero) — slot di input 2
- **value** (numero) — slot di input 3
- **index** (numero) — slot di input 4
- **length** (numero) — slot di input 5

## Espressione C generata

```c
(uint64_t) blockos_ext_usb_submit_usb_control_transfer(/* device */, /* request */, /* value */, /* index */, /* length */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_usb_submit_usb_control_transfer(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_submit_usb_control_transfer(0, 0, 0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
