<!-- auto-generated -->
# osx_virtual_memory_clone_address_space

**Type:** `osx_virtual_memory_clone_address_space`

**Etichetta visualizzata:** clone address space source

**Tipo blocco:** numero

**Categoria:** Virtual memory

## Argomenti

- **source** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_virtual_memory_clone_address_space(/* source */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_virtual_memory_clone_address_space(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_clone_address_space(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
