<!-- auto-generated -->
# osx_graphics_restore_screen_region

**Type:** `osx_graphics_restore_screen_region`

**Etichetta visualizzata:** restore saved screen region slot 0-7 x y

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **slot 0-7** (numero) — slot di input 1
- **x** (numero) — slot di input 2
- **y** (numero) — slot di input 3

## Chiamata C generata

```c
blockos_ext_graphics_restore_screen_region(/* slot 0-7 */, /* x */, /* y */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_restore_screen_region(uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_restore_screen_region(0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
