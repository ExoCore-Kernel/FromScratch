<!-- auto-generated -->
# osx_physical_memory_reserve_physical_range

**Type:** `osx_physical_memory_reserve_physical_range`

**Etichetta visualizzata:** reserve physical range start length

**Tipo blocco:** comando

**Categoria:** Physical memory

## Argomenti

- **start** (numero) — slot di input 1
- **length** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_physical_memory_reserve_physical_range(/* start */, /* length */);
```

## Prototipo runtime

```c
void blockos_ext_physical_memory_reserve_physical_range(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_physical_memory_reserve_physical_range(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
