<!-- auto-generated -->
# osx_networking_set_ipv4_subnet_mask

**Type:** `osx_networking_set_ipv4_subnet_mask`

**Etichetta visualizzata:** set IPv4 subnet mask interface mask

**Tipo blocco:** comando

**Categoria:** Networking

## Argomenti

- **interface** (numero) — slot di input 1
- **mask** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_networking_set_ipv4_subnet_mask(/* interface */, /* mask */);
```

## Prototipo runtime

```c
void blockos_ext_networking_set_ipv4_subnet_mask(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_networking_set_ipv4_subnet_mask(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
