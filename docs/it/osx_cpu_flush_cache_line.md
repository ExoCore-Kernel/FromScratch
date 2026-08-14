<!-- auto-generated -->
# osx_cpu_flush_cache_line

**Type:** `osx_cpu_flush_cache_line`

**Etichetta visualizzata:** flush cache line address

**Tipo blocco:** comando

**Categoria:** CPU

## Argomenti

- **address** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_cpu_flush_cache_line(/* address */);
```

## Prototipo runtime

```c
void blockos_ext_cpu_flush_cache_line(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_cpu_flush_cache_line(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
