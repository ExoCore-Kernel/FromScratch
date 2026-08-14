<!-- auto-generated -->
# osx_keyboard_and_mouse_set_mouse_cursor_visible

**Type:** `osx_keyboard_and_mouse_set_mouse_cursor_visible`

**Etichetta visualizzata:** set mouse cursor visible visible

**Tipo blocco:** comando

**Categoria:** Keyboard and mouse

## Argomenti

- **visible** (booleano) — slot di input 1

## Chiamata C generata

```c
blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible(/* visible */);
```

## Prototipo runtime

```c
void blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible(bool);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
