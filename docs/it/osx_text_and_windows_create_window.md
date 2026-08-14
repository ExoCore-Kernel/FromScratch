<!-- auto-generated -->
# osx_text_and_windows_create_window

**Type:** `osx_text_and_windows_create_window`

**Etichetta visualizzata:** create window title x y width height

**Tipo blocco:** numero

**Categoria:** Text and windows

## Argomenti

- **title** (stringa) — slot di input 1
- **x** (numero) — slot di input 2
- **y** (numero) — slot di input 3
- **width** (numero) — slot di input 4
- **height** (numero) — slot di input 5

## Espressione C generata

```c
(uint64_t) blockos_ext_text_and_windows_create_window(/* title */, /* x */, /* y */, /* width */, /* height */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_text_and_windows_create_window(const char *, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_create_window(0, 0, 0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
