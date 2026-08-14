<!-- auto-generated -->
# osx_cpu_get_logical_processor_count

**Type:** `osx_cpu_get_logical_processor_count`

**Etichetta visualizzata:** get logical processor count

**Tipo blocco:** numero

**Categoria:** CPU

## Espressione C generata

```c
(uint64_t) blockos_ext_cpu_get_logical_processor_count()
```

## Prototipo runtime

```c
uint64_t blockos_ext_cpu_get_logical_processor_count(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_get_logical_processor_count();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
