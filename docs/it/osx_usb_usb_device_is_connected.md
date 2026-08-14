<!-- auto-generated -->
# osx_usb_usb_device_is_connected

**Type:** `osx_usb_usb_device_is_connected`

**Etichetta visualizzata:** USB device is connected device

**Tipo blocco:** booleano

**Categoria:** USB

## Argomenti

- **device** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_usb_usb_device_is_connected(/* device */)
```

## Prototipo runtime

```c
bool blockos_ext_usb_usb_device_is_connected(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_usb_device_is_connected(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
