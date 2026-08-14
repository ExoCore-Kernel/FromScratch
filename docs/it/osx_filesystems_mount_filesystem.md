<!-- auto-generated -->
# osx_filesystems_mount_filesystem

**Type:** `osx_filesystems_mount_filesystem`

**Etichetta visualizzata:** mount filesystem device path type

**Tipo blocco:** numero

**Categoria:** Filesystems

## Argomenti

- **device** (stringa) — slot di input 1
- **path** (stringa) — slot di input 2
- **type** (stringa) — slot di input 3

## Espressione C generata

```c
(uint64_t) blockos_ext_filesystems_mount_filesystem(/* device */, /* path */, /* type */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_filesystems_mount_filesystem(const char *, const char *, const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_mount_filesystem(0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
