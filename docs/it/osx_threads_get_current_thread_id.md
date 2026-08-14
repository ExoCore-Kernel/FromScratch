<!-- auto-generated -->
# osx_threads_get_current_thread_id

**Type:** `osx_threads_get_current_thread_id`

**Etichetta visualizzata:** get current thread id

**Tipo blocco:** numero

**Categoria:** Threads

## Espressione C generata

```c
(uint64_t) blockos_ext_threads_get_current_thread_id()
```

## Prototipo runtime

```c
uint64_t blockos_ext_threads_get_current_thread_id(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_threads_get_current_thread_id();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
