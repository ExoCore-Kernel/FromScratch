<!-- auto-generated -->
# osx_threads_set_thread_affinity

**Type:** `osx_threads_set_thread_affinity`

**Etichetta visualizzata:** set thread affinity thread id cpu

**Tipo blocco:** comando

**Categoria:** Threads

## Argomenti

- **thread id** (numero) — slot di input 1
- **cpu** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_threads_set_thread_affinity(/* thread id */, /* cpu */);
```

## Prototipo runtime

```c
void blockos_ext_threads_set_thread_affinity(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_threads_set_thread_affinity(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
