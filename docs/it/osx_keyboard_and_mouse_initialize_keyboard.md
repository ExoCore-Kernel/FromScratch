<!-- auto-generated -->
# osx_keyboard_and_mouse_initialize_keyboard

**Type:** `osx_keyboard_and_mouse_initialize_keyboard`

**Etichetta visualizzata:** initialize keyboard

**Tipo blocco:** comando

**Categoria:** Keyboard and mouse

## Chiamata C generata

```c
blockos_ext_keyboard_and_mouse_initialize_keyboard();
```

## Prototipo runtime

```c
void blockos_ext_keyboard_and_mouse_initialize_keyboard(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_initialize_keyboard();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
