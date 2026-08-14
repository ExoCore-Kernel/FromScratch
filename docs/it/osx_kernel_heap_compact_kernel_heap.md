<!-- auto-generated -->
# osx_kernel_heap_compact_kernel_heap

**Type:** `osx_kernel_heap_compact_kernel_heap`

**Etichetta visualizzata:** compact kernel heap

**Tipo blocco:** comando

**Categoria:** Kernel heap

## Chiamata C generata

```c
blockos_ext_kernel_heap_compact_kernel_heap();
```

## Prototipo runtime

```c
void blockos_ext_kernel_heap_compact_kernel_heap(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_compact_kernel_heap();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
