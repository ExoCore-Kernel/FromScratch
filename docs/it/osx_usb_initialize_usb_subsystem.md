<!-- auto-generated -->
# osx_usb_initialize_usb_subsystem

**Type:** `osx_usb_initialize_usb_subsystem`

**Etichetta visualizzata:** initialize USB subsystem

**Tipo blocco:** comando

**Categoria:** USB

## Chiamata C generata

```c
blockos_ext_usb_initialize_usb_subsystem();
```

## Prototipo runtime

```c
void blockos_ext_usb_initialize_usb_subsystem(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_usb_initialize_usb_subsystem();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
