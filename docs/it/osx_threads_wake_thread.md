<!-- auto-generated -->
# osx_threads_wake_thread

**Type:** `osx_threads_wake_thread`

**Etichetta visualizzata:** wake thread thread id

**Tipo blocco:** comando

**Categoria:** Threads

## Argomenti

- **thread id** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_threads_wake_thread(/* thread id */);
```

## Prototipo runtime

```c
void blockos_ext_threads_wake_thread(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_threads_wake_thread(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
