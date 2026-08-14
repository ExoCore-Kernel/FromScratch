<!-- auto-generated -->
# osx_kernel_heap_get_allocation_size

**Type:** `osx_kernel_heap_get_allocation_size`

**Etichetta visualizzata:** get allocation size address

**Tipo blocco:** numero

**Categoria:** Kernel heap

## Argomenti

- **address** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_heap_get_allocation_size(/* address */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_heap_get_allocation_size(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_get_allocation_size(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
