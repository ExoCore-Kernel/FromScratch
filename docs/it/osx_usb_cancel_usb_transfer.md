<!-- auto-generated -->
# osx_usb_cancel_usb_transfer

**Type:** `osx_usb_cancel_usb_transfer`

**Etichetta visualizzata:** cancel USB transfer transfer

**Tipo blocco:** comando

**Categoria:** USB

## Argomenti

- **transfer** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_usb_cancel_usb_transfer(/* transfer */);
```

## Prototipo runtime

```c
void blockos_ext_usb_cancel_usb_transfer(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_usb_cancel_usb_transfer(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
