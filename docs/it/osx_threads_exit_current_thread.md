<!-- auto-generated -->
# osx_threads_exit_current_thread

**Type:** `osx_threads_exit_current_thread`

**Etichetta visualizzata:** exit current thread exit code

**Tipo blocco:** comando

**Categoria:** Threads

## Argomenti

- **exit code** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_threads_exit_current_thread(/* exit code */);
```

## Prototipo runtime

```c
void blockos_ext_threads_exit_current_thread(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_threads_exit_current_thread(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
