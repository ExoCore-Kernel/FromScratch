<!-- auto-generated -->
# osx_physical_memory_get_memory_map_entry_length

**Type:** `osx_physical_memory_get_memory_map_entry_length`

**Etichetta visualizzata:** get memory map entry length index

**Tipo blocco:** numero

**Categoria:** Physical memory

## Argomenti

- **index** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_physical_memory_get_memory_map_entry_length(/* index */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_physical_memory_get_memory_map_entry_length(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_get_memory_map_entry_length(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
