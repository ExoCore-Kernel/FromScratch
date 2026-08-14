<!-- auto-generated -->
# osx_physical_memory_get_memory_map_entry_count

**Type:** `osx_physical_memory_get_memory_map_entry_count`

**Etichetta visualizzata:** get memory map entry count

**Tipo blocco:** numero

**Categoria:** Physical memory

## Espressione C generata

```c
(uint64_t) blockos_ext_physical_memory_get_memory_map_entry_count()
```

## Prototipo runtime

```c
uint64_t blockos_ext_physical_memory_get_memory_map_entry_count(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_get_memory_map_entry_count();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
