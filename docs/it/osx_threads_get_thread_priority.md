<!-- auto-generated -->
# osx_threads_get_thread_priority

**Type:** `osx_threads_get_thread_priority`

**Etichetta visualizzata:** get thread priority thread id

**Tipo blocco:** numero

**Categoria:** Threads

## Argomenti

- **thread id** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_threads_get_thread_priority(/* thread id */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_threads_get_thread_priority(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_threads_get_thread_priority(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
