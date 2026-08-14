<!-- auto-generated -->
# osx_keyboard_and_mouse_initialize_mouse

**Type:** `osx_keyboard_and_mouse_initialize_mouse`

**Etichetta visualizzata:** initialize mouse

**Tipo blocco:** comando

**Categoria:** Keyboard and mouse

## Chiamata C generata

```c
blockos_ext_keyboard_and_mouse_initialize_mouse();
```

## Prototipo runtime

```c
void blockos_ext_keyboard_and_mouse_initialize_mouse(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_initialize_mouse();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
