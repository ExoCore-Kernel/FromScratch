<!-- auto-generated -->
# osx_threads_yield_current_thread

**Type:** `osx_threads_yield_current_thread`

**Etichetta visualizzata:** yield current thread

**Tipo blocco:** comando

**Categoria:** Threads

## Chiamata C generata

```c
blockos_ext_threads_yield_current_thread();
```

## Prototipo runtime

```c
void blockos_ext_threads_yield_current_thread(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_threads_yield_current_thread();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
