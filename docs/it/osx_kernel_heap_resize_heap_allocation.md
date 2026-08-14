<!-- auto-generated -->
# osx_kernel_heap_resize_heap_allocation

**Type:** `osx_kernel_heap_resize_heap_allocation`

**Etichetta visualizzata:** resize heap allocation address new size

**Tipo blocco:** numero

**Categoria:** Kernel heap

## Argomenti

- **address** (numero) — slot di input 1
- **new size** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_heap_resize_heap_allocation(/* address */, /* new size */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_heap_resize_heap_allocation(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_resize_heap_allocation(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
