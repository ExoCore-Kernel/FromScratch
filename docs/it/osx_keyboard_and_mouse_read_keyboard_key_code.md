<!-- auto-generated -->
# osx_keyboard_and_mouse_read_keyboard_key_code

**Type:** `osx_keyboard_and_mouse_read_keyboard_key_code`

**Etichetta visualizzata:** read keyboard key code

**Tipo blocco:** numero

**Categoria:** Keyboard and mouse

## Espressione C generata

```c
(uint64_t) blockos_ext_keyboard_and_mouse_read_keyboard_key_code()
```

## Prototipo runtime

```c
uint64_t blockos_ext_keyboard_and_mouse_read_keyboard_key_code(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_read_keyboard_key_code();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
