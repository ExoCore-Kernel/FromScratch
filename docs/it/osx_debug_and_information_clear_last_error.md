<!-- auto-generated -->
# osx_debug_and_information_clear_last_error

**Type:** `osx_debug_and_information_clear_last_error`

**Etichetta visualizzata:** clear last error

**Tipo blocco:** comando

**Categoria:** Debug and information

## Chiamata C generata

```c
blockos_ext_debug_and_information_clear_last_error();
```

## Prototipo runtime

```c
void blockos_ext_debug_and_information_clear_last_error(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_clear_last_error();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
