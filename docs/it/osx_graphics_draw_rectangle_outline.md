<!-- auto-generated -->
# osx_graphics_draw_rectangle_outline

**Type:** `osx_graphics_draw_rectangle_outline`

**Etichetta visualizzata:** draw rectangle outline x y width height colour

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **x** (numero) — slot di input 1
- **y** (numero) — slot di input 2
- **width** (numero) — slot di input 3
- **height** (numero) — slot di input 4
- **colour** (numero) — slot di input 5

## Chiamata C generata

```c
blockos_ext_graphics_draw_rectangle_outline(/* x */, /* y */, /* width */, /* height */, /* colour */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_draw_rectangle_outline(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_rectangle_outline(0, 0, 0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
