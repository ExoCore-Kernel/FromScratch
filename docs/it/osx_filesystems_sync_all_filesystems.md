<!-- auto-generated -->
# osx_filesystems_sync_all_filesystems

**Type:** `osx_filesystems_sync_all_filesystems`

**Etichetta visualizzata:** sync all filesystems

**Tipo blocco:** comando

**Categoria:** Filesystems

## Chiamata C generata

```c
blockos_ext_filesystems_sync_all_filesystems();
```

## Prototipo runtime

```c
void blockos_ext_filesystems_sync_all_filesystems(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_filesystems_sync_all_filesystems();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
