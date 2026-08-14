<!-- auto-generated -->
# osx_graphics_copy_screen_region

**Type:** `osx_graphics_copy_screen_region`

**Etichetta visualizzata:** copy screen region source x source y destination x destination y width height

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **source x** (numero) — slot di input 1
- **source y** (numero) — slot di input 2
- **destination x** (numero) — slot di input 3
- **destination y** (numero) — slot di input 4
- **width** (numero) — slot di input 5
- **height** (numero) — slot di input 6

## Chiamata C generata

```c
blockos_ext_graphics_copy_screen_region(/* source x */, /* source y */, /* destination x */, /* destination y */, /* width */, /* height */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_copy_screen_region(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_copy_screen_region(0, 0, 0, 0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
