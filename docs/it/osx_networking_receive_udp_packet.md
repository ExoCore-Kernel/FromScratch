<!-- auto-generated -->
# osx_networking_receive_udp_packet

**Type:** `osx_networking_receive_udp_packet`

**Etichetta visualizzata:** receive UDP packet socket buffer maximum

**Tipo blocco:** numero

**Categoria:** Networking

## Argomenti

- **socket** (numero) — slot di input 1
- **buffer** (numero) — slot di input 2
- **maximum** (numero) — slot di input 3

## Espressione C generata

```c
(uint64_t) blockos_ext_networking_receive_udp_packet(/* socket */, /* buffer */, /* maximum */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_networking_receive_udp_packet(uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_receive_udp_packet(0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
