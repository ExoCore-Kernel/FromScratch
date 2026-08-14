<!-- auto-generated -->
# osx_kernel_heap_free_to_memory_pool

**Type:** `osx_kernel_heap_free_to_memory_pool`

**Etichetta visualizzata:** free to memory pool pool address

**Tipo blocco:** comando

**Categoria:** Kernel heap

## Argomenti

- **pool** (numero) — slot di input 1
- **address** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_kernel_heap_free_to_memory_pool(/* pool */, /* address */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_heap_free_to_memory_pool(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_free_to_memory_pool(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
