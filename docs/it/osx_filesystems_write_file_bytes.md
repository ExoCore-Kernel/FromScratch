<!-- auto-generated -->
# osx_filesystems_write_file_bytes

**Type:** `osx_filesystems_write_file_bytes`

**Etichetta visualizzata:** write file bytes handle buffer length

**Tipo blocco:** numero

**Categoria:** Filesystems

## Argomenti

- **handle** (numero) — slot di input 1
- **buffer** (numero) — slot di input 2
- **length** (numero) — slot di input 3

## Espressione C generata

```c
(uint64_t) blockos_ext_filesystems_write_file_bytes(/* handle */, /* buffer */, /* length */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_filesystems_write_file_bytes(uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_write_file_bytes(0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
