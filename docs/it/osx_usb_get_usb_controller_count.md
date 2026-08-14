<!-- auto-generated -->
# osx_usb_get_usb_controller_count

**Type:** `osx_usb_get_usb_controller_count`

**Etichetta visualizzata:** get USB controller count

**Tipo blocco:** numero

**Categoria:** USB

## Espressione C generata

```c
(uint64_t) blockos_ext_usb_get_usb_controller_count()
```

## Prototipo runtime

```c
uint64_t blockos_ext_usb_get_usb_controller_count(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_usb_get_usb_controller_count();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
