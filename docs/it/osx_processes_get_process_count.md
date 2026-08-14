<!-- auto-generated -->
# osx_processes_get_process_count

**Type:** `osx_processes_get_process_count`

**Etichetta visualizzata:** get process count

**Tipo blocco:** numero

**Categoria:** Processes

## Espressione C generata

```c
(uint64_t) blockos_ext_processes_get_process_count()
```

## Prototipo runtime

```c
uint64_t blockos_ext_processes_get_process_count(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_get_process_count();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
