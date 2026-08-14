<!-- auto-generated -->
# osx_networking_get_ipv4_address

**Type:** `osx_networking_get_ipv4_address`

**Etichetta visualizzata:** get IPv4 address interface

**Tipo blocco:** numero

**Categoria:** Networking

## Argomenti

- **interface** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_networking_get_ipv4_address(/* interface */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_networking_get_ipv4_address(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_get_ipv4_address(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
