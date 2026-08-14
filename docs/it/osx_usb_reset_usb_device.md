<!-- auto-generated -->
# osx_usb_reset_usb_device

**Type:** `osx_usb_reset_usb_device`

**Etichetta visualizzata:** reset USB device device

**Tipo blocco:** numero

**Categoria:** USB

## Argomenti

- **device** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_usb_reset_usb_device(/* device */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_usb_reset_usb_device(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_reset_usb_device(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
