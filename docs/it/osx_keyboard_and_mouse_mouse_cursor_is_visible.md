<!-- auto-generated -->
# osx_keyboard_and_mouse_mouse_cursor_is_visible

**Type:** `osx_keyboard_and_mouse_mouse_cursor_is_visible`

**Etichetta visualizzata:** mouse cursor is visible

**Tipo blocco:** booleano

**Categoria:** Keyboard and mouse

## Espressione C generata

```c
(bool) blockos_ext_keyboard_and_mouse_mouse_cursor_is_visible()
```

## Prototipo runtime

```c
bool blockos_ext_keyboard_and_mouse_mouse_cursor_is_visible(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_mouse_cursor_is_visible();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
