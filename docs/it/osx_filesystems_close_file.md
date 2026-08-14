<!-- auto-generated -->
# osx_filesystems_close_file

**Type:** `osx_filesystems_close_file`

**Etichetta visualizzata:** close file handle

**Tipo blocco:** comando

**Categoria:** Filesystems

## Argomenti

- **handle** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_filesystems_close_file(/* handle */);
```

## Prototipo runtime

```c
void blockos_ext_filesystems_close_file(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_filesystems_close_file(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
