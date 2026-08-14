<!-- auto-generated -->
# osx_graphics_enable_back_buffer

**Type:** `osx_graphics_enable_back_buffer`

**Etichetta visualizzata:** enable graphics back buffer enabled

**Tipo blocco:** comando

**Categoria:** Graphics

## Argomenti

- **enabled** (booleano) — slot di input 1

## Chiamata C generata

```c
blockos_ext_graphics_enable_back_buffer(/* enabled */);
```

## Prototipo runtime

```c
void blockos_ext_graphics_enable_back_buffer(bool);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_graphics_enable_back_buffer(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
