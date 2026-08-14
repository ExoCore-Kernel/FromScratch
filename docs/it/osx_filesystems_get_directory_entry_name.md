<!-- auto-generated -->
# osx_filesystems_get_directory_entry_name

**Type:** `osx_filesystems_get_directory_entry_name`

**Etichetta visualizzata:** get directory entry name path index

**Tipo blocco:** stringa

**Categoria:** Filesystems

## Argomenti

- **path** (stringa) — slot di input 1
- **index** (numero) — slot di input 2

## Espressione C generata

```c
(const char *) blockos_ext_filesystems_get_directory_entry_name(/* path */, /* index */)
```

## Prototipo runtime

```c
const char * blockos_ext_filesystems_get_directory_entry_name(const char *, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_get_directory_entry_name(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
