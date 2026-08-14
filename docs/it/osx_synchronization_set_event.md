<!-- auto-generated -->
# osx_synchronization_set_event

**Type:** `osx_synchronization_set_event`

**Etichetta visualizzata:** set event event

**Tipo blocco:** comando

**Categoria:** Synchronization

## Argomenti

- **event** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_synchronization_set_event(/* event */);
```

## Prototipo runtime

```c
void blockos_ext_synchronization_set_event(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_synchronization_set_event(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
