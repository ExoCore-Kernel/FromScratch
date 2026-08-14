<!-- auto-generated -->
# osx_virtual_memory_flush_entire_tlb

**Type:** `osx_virtual_memory_flush_entire_tlb`

**Etichetta visualizzata:** flush entire TLB

**Tipo blocco:** comando

**Categoria:** Virtual memory

## Chiamata C generata

```c
blockos_ext_virtual_memory_flush_entire_tlb();
```

## Prototipo runtime

```c
void blockos_ext_virtual_memory_flush_entire_tlb(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_flush_entire_tlb();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
