<!-- auto-generated -->
# osx_filesystems_seek_file

**Type:** `osx_filesystems_seek_file`

**Etichetta visualizzata:** seek file handle offset mode

**Tipo blocco:** numero

**Categoria:** Filesystems

## Argomenti

- **handle** (numero) — slot di input 1
- **offset** (numero) — slot di input 2
- **mode** (numero) — slot di input 3

## Espressione C generata

```c
(uint64_t) blockos_ext_filesystems_seek_file(/* handle */, /* offset */, /* mode */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_filesystems_seek_file(uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_seek_file(0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
