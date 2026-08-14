<!-- auto-generated -->
# osx_networking_initialize_network_stack

**Type:** `osx_networking_initialize_network_stack`

**Etichetta visualizzata:** initialize network stack

**Tipo blocco:** comando

**Categoria:** Networking

## Chiamata C generata

```c
blockos_ext_networking_initialize_network_stack();
```

## Prototipo runtime

```c
void blockos_ext_networking_initialize_network_stack(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_networking_initialize_network_stack();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
