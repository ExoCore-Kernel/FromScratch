<!-- auto-generated -->
# osx_kernel_heap_allocate_zeroed_items

**Type:** `osx_kernel_heap_allocate_zeroed_items`

**Etichetta visualizzata:** allocate zeroed items count item size

**Tipo blocco:** numero

**Categoria:** Kernel heap

## Argomenti

- **count** (numero) — slot di input 1
- **item size** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_heap_allocate_zeroed_items(/* count */, /* item size */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_heap_allocate_zeroed_items(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_allocate_zeroed_items(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
