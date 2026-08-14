<!-- auto-generated -->
# osx_physical_memory_copy_physical_page

**Type:** `osx_physical_memory_copy_physical_page`

**Etichetta visualizzata:** copy physical page destination source

**Tipo blocco:** comando

**Categoria:** Physical memory

## Argomenti

- **destination** (numero) — slot di input 1
- **source** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_physical_memory_copy_physical_page(/* destination */, /* source */);
```

## Prototipo runtime

```c
void blockos_ext_physical_memory_copy_physical_page(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_physical_memory_copy_physical_page(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
