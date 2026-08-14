<!-- auto-generated -->
# osx_graphics_draw_fast_mouse_cursor

**Type:** `osx_graphics_draw_fast_mouse_cursor`

**Etichetta visualizzata:** draw fast mouse cursor x y

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **x** (numero) — slot di input 1
- **y** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_graphics_draw_fast_mouse_cursor(/* x */, /* y */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_draw_fast_mouse_cursor(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_fast_mouse_cursor(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
