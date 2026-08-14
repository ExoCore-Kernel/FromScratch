<!-- auto-generated -->
# osx_processes_get_process_priority

**Type:** `osx_processes_get_process_priority`

**Etichetta visualizzata:** get process priority process id

**Tipo blocco:** numero

**Categoria:** Processes

## Argomenti

- **process id** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_processes_get_process_priority(/* process id */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_processes_get_process_priority(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_get_process_priority(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
