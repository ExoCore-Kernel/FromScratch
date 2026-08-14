<!-- auto-generated -->
# osx_debug_and_information_get_architecture_name

**Type:** `osx_debug_and_information_get_architecture_name`

**Etichetta visualizzata:** get architecture name

**Tipo blocco:** stringa

**Categoria:** Debug and information

## Espressione C generata

```c
(const char *) blockos_ext_debug_and_information_get_architecture_name()
```

## Prototipo runtime

```c
const char * blockos_ext_debug_and_information_get_architecture_name(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_debug_and_information_get_architecture_name();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
