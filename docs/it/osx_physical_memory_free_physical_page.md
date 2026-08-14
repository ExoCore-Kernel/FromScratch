<!-- auto-generated -->
# osx_physical_memory_free_physical_page

**Type:** `osx_physical_memory_free_physical_page`

**Etichetta visualizzata:** free physical page address

**Tipo blocco:** comando

**Categoria:** Physical memory

## Argomenti

- **address** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_physical_memory_free_physical_page(/* address */);
```

## Prototipo runtime

```c
void blockos_ext_physical_memory_free_physical_page(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_physical_memory_free_physical_page(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
