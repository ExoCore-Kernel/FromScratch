<!-- auto-generated -->
# osx_kernel_heap_destroy_memory_pool

**Type:** `osx_kernel_heap_destroy_memory_pool`

**Etichetta visualizzata:** destroy memory pool pool

**Tipo blocco:** comando

**Categoria:** Kernel heap

## Argomenti

- **pool** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_kernel_heap_destroy_memory_pool(/* pool */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_heap_destroy_memory_pool(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_destroy_memory_pool(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
