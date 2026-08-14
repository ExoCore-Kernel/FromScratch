<!-- auto-generated -->
# osx_virtual_memory_map_virtual_range

**Type:** `osx_virtual_memory_map_virtual_range`

**Etichetta visualizzata:** map virtual range virtual physical pages

**Tipo blocco:** comando

**Categoria:** Virtual memory

## Argomenti

- **virtual** (numero) — slot di input 1
- **physical** (numero) — slot di input 2
- **pages** (numero) — slot di input 3

## Chiamata C generata

```c
blockos_ext_virtual_memory_map_virtual_range(/* virtual */, /* physical */, /* pages */);
```

## Prototipo runtime

```c
void blockos_ext_virtual_memory_map_virtual_range(uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_map_virtual_range(0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
