<!-- auto-generated -->
# osx_graphics_get_screen_width

**Type:** `osx_graphics_get_screen_width`

**Etichetta visualizzata:** get screen width

**Tipo blocco:** numero

**Categoria:** Graphics

## Espressione C generata

```c
(uint64_t) blockos_ext_graphics_get_screen_width()
```

## Prototipo runtime

```c
uint64_t blockos_ext_graphics_get_screen_width(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_graphics_get_screen_width();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
