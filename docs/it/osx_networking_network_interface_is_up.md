<!-- auto-generated -->
# osx_networking_network_interface_is_up

**Type:** `osx_networking_network_interface_is_up`

**Etichetta visualizzata:** network interface is up interface

**Tipo blocco:** booleano

**Categoria:** Networking

## Argomenti

- **interface** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_networking_network_interface_is_up(/* interface */)
```

## Prototipo runtime

```c
bool blockos_ext_networking_network_interface_is_up(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_network_interface_is_up(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
