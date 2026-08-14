<!-- auto-generated -->
# osx_graphics_set_clipping_rectangle

**Type:** `osx_graphics_set_clipping_rectangle`

**Etichetta visualizzata:** set clipping rectangle x y width height

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **x** (numero) — slot di input 1
- **y** (numero) — slot di input 2
- **width** (numero) — slot di input 3
- **height** (numero) — slot di input 4

## Chiamata C generata

```c
blockos_ext_graphics_set_clipping_rectangle(/* x */, /* y */, /* width */, /* height */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_set_clipping_rectangle(uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_set_clipping_rectangle(0, 0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
