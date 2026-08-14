<!-- auto-generated -->
# osx_networking_send_udp_packet

**Type:** `osx_networking_send_udp_packet`

**Etichetta visualizzata:** send UDP packet socket address port buffer length

**Tipo blocco:** numero

**Categoria:** Networking

## Argomenti

- **socket** (numero) — slot di input 1
- **address** (numero) — slot di input 2
- **port** (numero) — slot di input 3
- **buffer** (numero) — slot di input 4
- **length** (numero) — slot di input 5

## Espressione C generata

```c
(uint64_t) blockos_ext_networking_send_udp_packet(/* socket */, /* address */, /* port */, /* buffer */, /* length */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_networking_send_udp_packet(uint64_t, uint64_t, uint64_t, uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_networking_send_udp_packet(0, 0, 0, 0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
