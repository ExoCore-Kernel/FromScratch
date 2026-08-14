<!-- auto-generated -->
# osx_text_and_windows_draw_text_at_position

**Type:** `osx_text_and_windows_draw_text_at_position`

**Etichetta visualizzata:** draw text at position x y text colour

**Tipo blocco:** comando

**Categoria:** Text and windows

## Argomenti

- **x** (numero) — slot di input 1
- **y** (numero) — slot di input 2
- **text** (stringa) — slot di input 3
- **colour** (numero) — slot di input 4

## Chiamata C generata

```c
blockos_ext_text_and_windows_draw_text_at_position(/* x */, /* y */, /* text */, /* colour */);
```

## Prototipo runtime

```c
void blockos_ext_text_and_windows_draw_text_at_position(uint64_t, uint64_t, const char *, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_draw_text_at_position(0, 0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
