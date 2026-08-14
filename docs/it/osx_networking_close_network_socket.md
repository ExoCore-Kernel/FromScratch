<!-- auto-generated -->
# osx_networking_close_network_socket

**Type:** `osx_networking_close_network_socket`

**Etichetta visualizzata:** close network socket socket

**Tipo blocco:** comando

**Categoria:** Networking

## Argomenti

- **socket** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_networking_close_network_socket(/* socket */);
```

## Prototipo runtime

```c
void blockos_ext_networking_close_network_socket(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_networking_close_network_socket(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
