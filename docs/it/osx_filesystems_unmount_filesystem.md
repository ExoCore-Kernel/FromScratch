<!-- auto-generated -->
# osx_filesystems_unmount_filesystem

**Type:** `osx_filesystems_unmount_filesystem`

**Etichetta visualizzata:** unmount filesystem path

**Tipo blocco:** comando

**Categoria:** Filesystems

## Argomenti

- **path** (stringa) — slot di input 1

## Chiamata C generata

```c
blockos_ext_filesystems_unmount_filesystem(/* path */);
```

## Prototipo runtime

```c
void blockos_ext_filesystems_unmount_filesystem(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_filesystems_unmount_filesystem(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
