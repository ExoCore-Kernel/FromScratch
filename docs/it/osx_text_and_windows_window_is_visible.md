<!-- auto-generated -->
# osx_text_and_windows_window_is_visible

**Type:** `osx_text_and_windows_window_is_visible`

**Etichetta visualizzata:** window is visible window

**Tipo blocco:** booleano

**Categoria:** Text and windows

## Argomenti

- **window** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_text_and_windows_window_is_visible(/* window */)
```

## Prototipo runtime

```c
bool blockos_ext_text_and_windows_window_is_visible(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_window_is_visible(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
