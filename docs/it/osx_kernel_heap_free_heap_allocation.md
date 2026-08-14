<!-- auto-generated -->
# osx_kernel_heap_free_heap_allocation

**Type:** `osx_kernel_heap_free_heap_allocation`

**Etichetta visualizzata:** free heap allocation address

**Tipo blocco:** comando

**Categoria:** Kernel heap

## Argomenti

- **address** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_kernel_heap_free_heap_allocation(/* address */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_heap_free_heap_allocation(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_heap_free_heap_allocation(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
