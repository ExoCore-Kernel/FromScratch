<!-- auto-generated -->
# osx_threads_sleep_thread_ticks

**Type:** `osx_threads_sleep_thread_ticks`

**Etichetta visualizzata:** sleep thread ticks ticks

**Tipo blocco:** comando

**Categoria:** Threads

## Argomenti

- **ticks** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_threads_sleep_thread_ticks(/* ticks */);
```

## Prototipo runtime

```c
void blockos_ext_threads_sleep_thread_ticks(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_threads_sleep_thread_ticks(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
