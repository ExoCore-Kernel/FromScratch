<!-- auto-generated -->
# osx_networking_get_network_interface_count

**Type:** `osx_networking_get_network_interface_count`

**Etichetta visualizzata:** get network interface count

**Tipo blocco:** numero

**Categoria:** Networking

## Espressione C generata

```c
(uint64_t) blockos_ext_networking_get_network_interface_count()
```

## Prototipo runtime

```c
uint64_t blockos_ext_networking_get_network_interface_count(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_get_network_interface_count();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
