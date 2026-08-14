<!-- auto-generated -->
# osx_graphics_swap_graphics_buffers

**Type:** `osx_graphics_swap_graphics_buffers`

**Etichetta visualizzata:** swap graphics buffers

**Tipo blocco:** comando

**Categoria:** Graphics

## Chiamata C generata

```c
blockos_ext_graphics_swap_graphics_buffers();
```

## Prototipo runtime

```c
void blockos_ext_graphics_swap_graphics_buffers(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_swap_graphics_buffers();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
