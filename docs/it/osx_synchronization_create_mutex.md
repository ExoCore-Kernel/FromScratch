<!-- auto-generated -->
# osx_synchronization_create_mutex

**Type:** `osx_synchronization_create_mutex`

**Etichetta visualizzata:** create mutex

**Tipo blocco:** numero

**Categoria:** Synchronization

## Espressione C generata

```c
(uint64_t) blockos_ext_synchronization_create_mutex()
```

## Prototipo runtime

```c
uint64_t blockos_ext_synchronization_create_mutex(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_synchronization_create_mutex();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
