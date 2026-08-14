<!-- auto-generated -->
# osx_kernel_heap_initialize_kernel_heap

**Type:** `osx_kernel_heap_initialize_kernel_heap`

**Etichetta visualizzata:** initialize kernel heap start size

**Tipo blocco:** comando

**Categoria:** Kernel heap

## Argomenti

- **start** (numero) — slot di input 1
- **size** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_kernel_heap_initialize_kernel_heap(/* start */, /* size */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_heap_initialize_kernel_heap(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_initialize_kernel_heap(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
