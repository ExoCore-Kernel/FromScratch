<!-- auto-generated -->
# osx_debug_and_information_get_debug_log_level

**Type:** `osx_debug_and_information_get_debug_log_level`

**Etichetta visualizzata:** get debug log level

**Tipo blocco:** numero

**Categoria:** Debug and information

## Espressione C generata

```c
(uint64_t) blockos_ext_debug_and_information_get_debug_log_level()
```

## Prototipo runtime

```c
uint64_t blockos_ext_debug_and_information_get_debug_log_level(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_debug_and_information_get_debug_log_level();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
