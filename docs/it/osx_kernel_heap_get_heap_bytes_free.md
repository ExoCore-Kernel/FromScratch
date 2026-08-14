<!-- auto-generated -->
# osx_kernel_heap_get_heap_bytes_free

**Type:** `osx_kernel_heap_get_heap_bytes_free`

**Etichetta visualizzata:** get heap bytes free

**Tipo blocco:** numero

**Categoria:** Kernel heap

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_heap_get_heap_bytes_free()
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_heap_get_heap_bytes_free(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_get_heap_bytes_free();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
