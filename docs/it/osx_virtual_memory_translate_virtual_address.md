<!-- auto-generated -->
# osx_virtual_memory_translate_virtual_address

**Type:** `osx_virtual_memory_translate_virtual_address`

**Etichetta visualizzata:** translate virtual address virtual

**Tipo blocco:** numero

**Categoria:** Virtual memory

## Argomenti

- **virtual** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_virtual_memory_translate_virtual_address(/* virtual */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_virtual_memory_translate_virtual_address(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_virtual_memory_translate_virtual_address(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
