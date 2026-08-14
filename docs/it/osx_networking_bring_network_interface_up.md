<!-- auto-generated -->
# osx_networking_bring_network_interface_up

**Type:** `osx_networking_bring_network_interface_up`

**Etichetta visualizzata:** bring network interface up interface

**Tipo blocco:** comando

**Categoria:** Networking

## Argomenti

- **interface** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_networking_bring_network_interface_up(/* interface */);
```

## Prototipo runtime

```c
void blockos_ext_networking_bring_network_interface_up(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_networking_bring_network_interface_up(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
