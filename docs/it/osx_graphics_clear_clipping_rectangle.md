<!-- auto-generated -->
# osx_graphics_clear_clipping_rectangle

**Type:** `osx_graphics_clear_clipping_rectangle`

**Etichetta visualizzata:** clear clipping rectangle

**Tipo blocco:** comando

**Categoria:** Graphics

## Chiamata C generata

```c
blockos_ext_graphics_clear_clipping_rectangle();
```

## Prototipo runtime

```c
void blockos_ext_graphics_clear_clipping_rectangle(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_clear_clipping_rectangle();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
