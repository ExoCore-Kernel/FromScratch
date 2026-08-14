<!-- auto-generated -->
# osx_processes_get_current_process_id

**Type:** `osx_processes_get_current_process_id`

**Etichetta visualizzata:** get current process id

**Tipo blocco:** numero

**Categoria:** Processes

## Espressione C generata

```c
(uint64_t) blockos_ext_processes_get_current_process_id()
```

## Prototipo runtime

```c
uint64_t blockos_ext_processes_get_current_process_id(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_get_current_process_id();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
