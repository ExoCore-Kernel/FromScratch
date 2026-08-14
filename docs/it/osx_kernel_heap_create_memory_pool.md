<!-- auto-generated -->
# osx_kernel_heap_create_memory_pool

**Type:** `osx_kernel_heap_create_memory_pool`

**Etichetta visualizzata:** create memory pool item size item count

**Tipo blocco:** numero

**Categoria:** Kernel heap

## Argomenti

- **item size** (numero) — slot di input 1
- **item count** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_heap_create_memory_pool(/* item size */, /* item count */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_heap_create_memory_pool(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_create_memory_pool(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
