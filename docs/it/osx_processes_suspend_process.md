<!-- auto-generated -->
# osx_processes_suspend_process

**Type:** `osx_processes_suspend_process`

**Etichetta visualizzata:** suspend process process id

**Tipo blocco:** comando

**Categoria:** Processes

## Argomenti

- **process id** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_processes_suspend_process(/* process id */);
```

## Prototipo runtime

```c
void blockos_ext_processes_suspend_process(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_processes_suspend_process(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
