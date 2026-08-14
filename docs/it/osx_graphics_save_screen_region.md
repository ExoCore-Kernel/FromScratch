<!-- auto-generated -->
# osx_graphics_save_screen_region

**Type:** `osx_graphics_save_screen_region`

**Etichetta visualizzata:** save screen region slot 0-7 x y width max 64 height max 64

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **slot 0-7** (numero) — slot di input 1
- **x** (numero) — slot di input 2
- **y** (numero) — slot di input 3
- **width max 64** (numero) — slot di input 4
- **height max 64** (numero) — slot di input 5

## Chiamata C generata

```c
blockos_ext_graphics_save_screen_region(/* slot 0-7 */, /* x */, /* y */, /* width max 64 */, /* height max 64 */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_save_screen_region(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_save_screen_region(0, 0, 0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
