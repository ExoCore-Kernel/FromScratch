<!-- auto-generated -->
# osx_threads_join_thread

**Type:** `osx_threads_join_thread`

**Etichetta visualizzata:** join thread thread id

**Tipo blocco:** numero

**Categoria:** Threads

## Argomenti

- **thread id** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_threads_join_thread(/* thread id */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_threads_join_thread(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_threads_join_thread(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
