<!-- auto-generated -->
# osx_kernel_heap_allocate_from_memory_pool

**Type:** `osx_kernel_heap_allocate_from_memory_pool`

**Etichetta visualizzata:** allocate from memory pool pool

**Tipo blocco:** numero

**Categoria:** Kernel heap

## Argomenti

- **pool** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_heap_allocate_from_memory_pool(/* pool */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_heap_allocate_from_memory_pool(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_allocate_from_memory_pool(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
