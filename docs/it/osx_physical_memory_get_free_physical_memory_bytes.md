<!-- auto-generated -->
# osx_physical_memory_get_free_physical_memory_bytes

**Type:** `osx_physical_memory_get_free_physical_memory_bytes`

**Etichetta visualizzata:** get free physical memory bytes

**Tipo blocco:** numero

**Categoria:** Physical memory

## Espressione C generata

```c
(uint64_t) blockos_ext_physical_memory_get_free_physical_memory_bytes()
```

## Prototipo runtime

```c
uint64_t blockos_ext_physical_memory_get_free_physical_memory_bytes(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_get_free_physical_memory_bytes();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
