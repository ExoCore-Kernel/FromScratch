<!-- auto-generated -->
# osx_physical_memory_get_physical_page_size

**Type:** `osx_physical_memory_get_physical_page_size`

**Etichetta visualizzata:** get physical page size

**Tipo blocco:** numero

**Categoria:** Physical memory

## Espressione C generata

```c
(uint64_t) blockos_ext_physical_memory_get_physical_page_size()
```

## Prototipo runtime

```c
uint64_t blockos_ext_physical_memory_get_physical_page_size(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_get_physical_page_size();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
