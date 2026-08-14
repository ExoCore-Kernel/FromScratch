<!-- auto-generated -->
# osx_keyboard_and_mouse_get_mouse_button_mask

**Type:** `osx_keyboard_and_mouse_get_mouse_button_mask`

**Etichetta visualizzata:** get mouse button mask

**Tipo blocco:** numero

**Categoria:** Keyboard and mouse

## Espressione C generata

```c
(uint64_t) blockos_ext_keyboard_and_mouse_get_mouse_button_mask()
```

## Prototipo runtime

```c
uint64_t blockos_ext_keyboard_and_mouse_get_mouse_button_mask(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_get_mouse_button_mask();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
