<!-- auto-generated -->
# osx_filesystems_get_directory_entry_count

**Type:** `osx_filesystems_get_directory_entry_count`

**Etichetta visualizzata:** get directory entry count path

**Tipo blocco:** numero

**Categoria:** Filesystems

## Argomenti

- **path** (stringa) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_filesystems_get_directory_entry_count(/* path */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_filesystems_get_directory_entry_count(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_get_directory_entry_count(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
