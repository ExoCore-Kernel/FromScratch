<!-- auto-generated -->
# osx_synchronization_unlock_mutex

**Type:** `osx_synchronization_unlock_mutex`

**Etichetta visualizzata:** unlock mutex mutex

**Tipo blocco:** comando

**Categoria:** Synchronization

## Argomenti

- **mutex** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_synchronization_unlock_mutex(/* mutex */);
```

## Prototipo runtime

```c
void blockos_ext_synchronization_unlock_mutex(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_synchronization_unlock_mutex(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
