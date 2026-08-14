<!-- auto-generated -->
# osx_processes_get_process_name

**Type:** `osx_processes_get_process_name`

**Etichetta visualizzata:** get process name process id

**Tipo blocco:** stringa

**Categoria:** Processes

## Argomenti

- **process id** (numero) — slot di input 1

## Espressione C generata

```c
(const char *) blockos_ext_processes_get_process_name(/* process id */)
```

## Prototipo runtime

```c
const char * blockos_ext_processes_get_process_name(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_get_process_name(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
