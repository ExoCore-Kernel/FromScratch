<!-- auto-generated -->
# osx_filesystems_open_file

**Type:** `osx_filesystems_open_file`

**Etichetta visualizzata:** open file path flags

**Tipo blocco:** numero

**Categoria:** Filesystems

## Argomenti

- **path** (stringa) — slot di input 1
- **flags** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_filesystems_open_file(/* path */, /* flags */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_filesystems_open_file(const char *, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_open_file(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
