<!-- auto-generated -->
# osx_synchronization_destroy_semaphore

**Type:** `osx_synchronization_destroy_semaphore`

**Etichetta visualizzata:** destroy semaphore semaphore

**Tipo blocco:** comando

**Categoria:** Synchronization

## Argomenti

- **semaphore** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_synchronization_destroy_semaphore(/* semaphore */);
```

## Prototipo runtime

```c
void blockos_ext_synchronization_destroy_semaphore(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_synchronization_destroy_semaphore(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
