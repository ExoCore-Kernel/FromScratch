<!-- auto-generated -->
# osx_debug_and_information_get_last_error_code

**Type:** `osx_debug_and_information_get_last_error_code`

**Etichetta visualizzata:** get last error code

**Tipo blocco:** numero

**Categoria:** Debug and information

## Espressione C generata

```c
(uint64_t) blockos_ext_debug_and_information_get_last_error_code()
```

## Prototipo runtime

```c
uint64_t blockos_ext_debug_and_information_get_last_error_code(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_debug_and_information_get_last_error_code();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
