<!-- auto-generated -->
# osx_graphics_draw_horizontal_line

**Type:** `osx_graphics_draw_horizontal_line`

**Etichetta visualizzata:** draw horizontal line x y length colour

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **x** (numero) — slot di input 1
- **y** (numero) — slot di input 2
- **length** (numero) — slot di input 3
- **colour** (numero) — slot di input 4

## Chiamata C generata

```c
blockos_ext_graphics_draw_horizontal_line(/* x */, /* y */, /* length */, /* colour */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_draw_horizontal_line(uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_draw_horizontal_line(0, 0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
