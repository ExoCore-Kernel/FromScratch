<!-- auto-generated -->
# osx_physical_memory_get_memory_map_entry_start

**Type:** `osx_physical_memory_get_memory_map_entry_start`

**Etichetta visualizzata:** get memory map entry start index

**Tipo blocco:** numero

**Categoria:** Physical memory

## Argomenti

- **index** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_physical_memory_get_memory_map_entry_start(/* index */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_physical_memory_get_memory_map_entry_start(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_get_memory_map_entry_start(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
