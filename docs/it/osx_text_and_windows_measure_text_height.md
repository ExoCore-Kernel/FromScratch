<!-- auto-generated -->
# osx_text_and_windows_measure_text_height

**Type:** `osx_text_and_windows_measure_text_height`

**Etichetta visualizzata:** measure text height text

**Tipo blocco:** numero

**Categoria:** Text and windows

## Argomenti

- **text** (stringa) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_text_and_windows_measure_text_height(/* text */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_text_and_windows_measure_text_height(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_text_and_windows_measure_text_height(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
