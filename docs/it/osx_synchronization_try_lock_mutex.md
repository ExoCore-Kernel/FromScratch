<!-- auto-generated -->
# osx_synchronization_try_lock_mutex

**Type:** `osx_synchronization_try_lock_mutex`

**Etichetta visualizzata:** try lock mutex mutex

**Tipo blocco:** booleano

**Categoria:** Synchronization

## Argomenti

- **mutex** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_synchronization_try_lock_mutex(/* mutex */)
```

## Prototipo runtime

```c
bool blockos_ext_synchronization_try_lock_mutex(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_synchronization_try_lock_mutex(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
