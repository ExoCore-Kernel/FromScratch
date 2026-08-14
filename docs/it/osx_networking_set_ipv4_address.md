<!-- auto-generated -->
# osx_networking_set_ipv4_address

**Type:** `osx_networking_set_ipv4_address`

**Etichetta visualizzata:** set IPv4 address interface address

**Tipo blocco:** comando

**Categoria:** Networking

## Argomenti

- **interface** (numero) — slot di input 1
- **address** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_networking_set_ipv4_address(/* interface */, /* address */);
```

## Prototipo runtime

```c
void blockos_ext_networking_set_ipv4_address(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_networking_set_ipv4_address(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
