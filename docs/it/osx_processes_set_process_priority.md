<!-- auto-generated -->
# osx_processes_set_process_priority

**Type:** `osx_processes_set_process_priority`

**Etichetta visualizzata:** set process priority process id priority

**Tipo blocco:** comando

**Categoria:** Processes

## Argomenti

- **process id** (numero) — slot di input 1
- **priority** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_processes_set_process_priority(/* process id */, /* priority */);
```

## Prototipo runtime

```c
void blockos_ext_processes_set_process_priority(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_processes_set_process_priority(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
