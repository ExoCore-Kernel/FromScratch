<!-- auto-generated -->
# osx_processes_set_process_name

**Type:** `osx_processes_set_process_name`

**Etichetta visualizzata:** set process name process id name

**Tipo blocco:** comando

**Categoria:** Processes

## Argomenti

- **process id** (numero) — slot di input 1
- **name** (stringa) — slot di input 2

## Chiamata C generata

```c
blockos_ext_processes_set_process_name(/* process id */, /* name */);
```

## Prototipo runtime

```c
void blockos_ext_processes_set_process_name(uint64_t, const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_processes_set_process_name(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
