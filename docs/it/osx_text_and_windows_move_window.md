<!-- auto-generated -->
# osx_text_and_windows_move_window

**Type:** `osx_text_and_windows_move_window`

**Etichetta visualizzata:** move window window x y

**Tipo blocco:** comando

**Categoria:** Text and windows

## Argomenti

- **window** (numero) — slot di input 1
- **x** (numero) — slot di input 2
- **y** (numero) — slot di input 3

## Chiamata C generata

```c
blockos_ext_text_and_windows_move_window(/* window */, /* x */, /* y */);
```

## Prototipo runtime

```c
void blockos_ext_text_and_windows_move_window(uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_text_and_windows_move_window(0, 0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
