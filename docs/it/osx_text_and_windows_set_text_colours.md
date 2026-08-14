<!-- auto-generated -->
# osx_text_and_windows_set_text_colours

**Type:** `osx_text_and_windows_set_text_colours`

**Etichetta visualizzata:** set text colours foreground background

**Tipo blocco:** comando

**Categoria:** Text and windows

## Argomenti

- **foreground** (numero) — slot di input 1
- **background** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_text_and_windows_set_text_colours(/* foreground */, /* background */);
```

## Prototipo runtime

```c
void blockos_ext_text_and_windows_set_text_colours(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_set_text_colours(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
