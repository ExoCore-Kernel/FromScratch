<!-- auto-generated -->
# osx_processes_send_process_signal

**Type:** `osx_processes_send_process_signal`

**Etichetta visualizzata:** send process signal process id signal

**Tipo blocco:** comando

**Categoria:** Processes

## Argomenti

- **process id** (numero) — slot di input 1
- **signal** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_processes_send_process_signal(/* process id */, /* signal */);
```

## Prototipo runtime

```c
void blockos_ext_processes_send_process_signal(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_processes_send_process_signal(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
