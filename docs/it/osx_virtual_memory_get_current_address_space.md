<!-- auto-generated -->
# osx_virtual_memory_get_current_address_space

**Type:** `osx_virtual_memory_get_current_address_space`

**Etichetta visualizzata:** get current address space

**Tipo blocco:** numero

**Categoria:** Virtual memory

## Espressione C generata

```c
(uint64_t) blockos_ext_virtual_memory_get_current_address_space()
```

## Prototipo runtime

```c
uint64_t blockos_ext_virtual_memory_get_current_address_space(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_get_current_address_space();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
