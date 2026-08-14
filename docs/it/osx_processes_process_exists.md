<!-- auto-generated -->
# osx_processes_process_exists

**Type:** `osx_processes_process_exists`

**Etichetta visualizzata:** process exists process id

**Tipo blocco:** booleano

**Categoria:** Processes

## Argomenti

- **process id** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_processes_process_exists(/* process id */)
```

## Prototipo runtime

```c
bool blockos_ext_processes_process_exists(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_process_exists(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
