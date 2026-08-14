<!-- auto-generated -->
# osx_text_and_windows_print_line

**Type:** `osx_text_and_windows_print_line`

**Etichetta visualizzata:** print line text

**Tipo blocco:** comando

**Categoria:** Text and windows

## Argomenti

- **text** (stringa) — slot di input 1

## Chiamata C generata

```c
blockos_ext_text_and_windows_print_line(/* text */);
```

## Prototipo runtime

```c
void blockos_ext_text_and_windows_print_line(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_print_line(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
