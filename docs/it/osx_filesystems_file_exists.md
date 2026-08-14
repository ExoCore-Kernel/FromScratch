<!-- auto-generated -->
# osx_filesystems_file_exists

**Type:** `osx_filesystems_file_exists`

**Etichetta visualizzata:** file exists path

**Tipo blocco:** booleano

**Categoria:** Filesystems

## Argomenti

- **path** (stringa) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_filesystems_file_exists(/* path */)
```

## Prototipo runtime

```c
bool blockos_ext_filesystems_file_exists(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_file_exists(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
