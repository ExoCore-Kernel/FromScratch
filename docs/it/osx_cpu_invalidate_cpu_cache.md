<!-- auto-generated -->
# osx_cpu_invalidate_cpu_cache

**Type:** `osx_cpu_invalidate_cpu_cache`

**Etichetta visualizzata:** invalidate CPU cache

**Tipo blocco:** comando

**Categoria:** CPU

## Chiamata C generata

```c
blockos_ext_cpu_invalidate_cpu_cache();
```

## Prototipo runtime

```c
void blockos_ext_cpu_invalidate_cpu_cache(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_cpu_invalidate_cpu_cache();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
