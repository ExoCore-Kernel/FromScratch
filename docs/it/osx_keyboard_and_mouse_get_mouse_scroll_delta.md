<!-- auto-generated -->
# osx_keyboard_and_mouse_get_mouse_scroll_delta

**Type:** `osx_keyboard_and_mouse_get_mouse_scroll_delta`

**Etichetta visualizzata:** get mouse scroll delta

**Tipo blocco:** numero

**Categoria:** Keyboard and mouse

## Espressione C generata

```c
(uint64_t) blockos_ext_keyboard_and_mouse_get_mouse_scroll_delta()
```

## Prototipo runtime

```c
uint64_t blockos_ext_keyboard_and_mouse_get_mouse_scroll_delta(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_get_mouse_scroll_delta();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
