<!-- auto-generated -->
# osx_keyboard_and_mouse_mouse_button_is_pressed

**Type:** `osx_keyboard_and_mouse_mouse_button_is_pressed`

**Etichetta visualizzata:** mouse button is pressed button

**Tipo blocco:** booleano

**Categoria:** Keyboard and mouse

## Argomenti

- **button** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_keyboard_and_mouse_mouse_button_is_pressed(/* button */)
```

## Prototipo runtime

```c
bool blockos_ext_keyboard_and_mouse_mouse_button_is_pressed(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_keyboard_and_mouse_mouse_button_is_pressed(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
