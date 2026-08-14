<!-- auto-generated -->
# osx_graphics_draw_pixel_line_fast

**Type:** `osx_graphics_draw_pixel_line_fast`

**Etichetta visualizzata:** draw fast pixel line x1 y1 x2 y2 colour

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **x1** (numero) — slot di input 1
- **y1** (numero) — slot di input 2
- **x2** (numero) — slot di input 3
- **y2** (numero) — slot di input 4
- **colour** (numero) — slot di input 5

## Chiamata C generata

```c
blockos_ext_graphics_draw_pixel_line_fast(/* x1 */, /* y1 */, /* x2 */, /* y2 */, /* colour */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_draw_pixel_line_fast(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_pixel_line_fast(0, 0, 0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
