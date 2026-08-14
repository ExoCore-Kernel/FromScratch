<!-- auto-generated -->
# osx_text_and_windows_get_text_cursor_y

**Type:** `osx_text_and_windows_get_text_cursor_y`

**Etichetta visualizzata:** get text cursor y

**Tipo blocco:** numero

**Categoria:** Text and windows

## Espressione C generata

```c
(uint64_t) blockos_ext_text_and_windows_get_text_cursor_y()
```

## Prototipo runtime

```c
uint64_t blockos_ext_text_and_windows_get_text_cursor_y(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_get_text_cursor_y();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
