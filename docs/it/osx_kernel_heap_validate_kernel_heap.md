<!-- auto-generated -->
# osx_kernel_heap_validate_kernel_heap

**Type:** `osx_kernel_heap_validate_kernel_heap`

**Etichetta visualizzata:** validate kernel heap

**Tipo blocco:** booleano

**Categoria:** Kernel heap

## Espressione C generata

```c
(bool) blockos_ext_kernel_heap_validate_kernel_heap()
```

## Prototipo runtime

```c
bool blockos_ext_kernel_heap_validate_kernel_heap(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_heap_validate_kernel_heap();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
