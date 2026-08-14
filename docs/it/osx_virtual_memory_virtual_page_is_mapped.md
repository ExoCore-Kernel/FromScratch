<!-- auto-generated -->
# osx_virtual_memory_virtual_page_is_mapped

**Type:** `osx_virtual_memory_virtual_page_is_mapped`

**Etichetta visualizzata:** virtual page is mapped virtual

**Tipo blocco:** booleano

**Categoria:** Virtual memory

## Argomenti

- **virtual** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_virtual_memory_virtual_page_is_mapped(/* virtual */)
```

## Prototipo runtime

```c
bool blockos_ext_virtual_memory_virtual_page_is_mapped(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_virtual_page_is_mapped(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
