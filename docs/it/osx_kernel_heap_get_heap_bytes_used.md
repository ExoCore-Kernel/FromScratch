<!-- auto-generated -->
# osx_kernel_heap_get_heap_bytes_used

**Type:** `osx_kernel_heap_get_heap_bytes_used`

**Etichetta visualizzata:** get heap bytes used

**Tipo blocco:** numero

**Categoria:** Kernel heap

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_heap_get_heap_bytes_used()
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_heap_get_heap_bytes_used(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_get_heap_bytes_used();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
