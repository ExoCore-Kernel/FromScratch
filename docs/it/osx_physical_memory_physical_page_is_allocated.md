<!-- auto-generated -->
# osx_physical_memory_physical_page_is_allocated

**Type:** `osx_physical_memory_physical_page_is_allocated`

**Etichetta visualizzata:** physical page is allocated address

**Tipo blocco:** booleano

**Categoria:** Physical memory

## Argomenti

- **address** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_physical_memory_physical_page_is_allocated(/* address */)
```

## Prototipo runtime

```c
bool blockos_ext_physical_memory_physical_page_is_allocated(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_physical_memory_physical_page_is_allocated(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
