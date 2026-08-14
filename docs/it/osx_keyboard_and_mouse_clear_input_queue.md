<!-- auto-generated -->
# osx_keyboard_and_mouse_clear_input_queue

**Type:** `osx_keyboard_and_mouse_clear_input_queue`

**Etichetta visualizzata:** clear input queue

**Tipo blocco:** comando

**Categoria:** Keyboard and mouse

## Chiamata C generata

```c
blockos_ext_keyboard_and_mouse_clear_input_queue();
```

## Prototipo runtime

```c
void blockos_ext_keyboard_and_mouse_clear_input_queue(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_keyboard_and_mouse_clear_input_queue();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
