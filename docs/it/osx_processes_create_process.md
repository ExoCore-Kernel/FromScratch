<!-- auto-generated -->
# osx_processes_create_process

**Type:** `osx_processes_create_process`

**Etichetta visualizzata:** create process name entry address

**Tipo blocco:** numero

**Categoria:** Processes

## Argomenti

- **name** (stringa) — slot di input 1
- **entry address** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_processes_create_process(/* name */, /* entry address */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_processes_create_process(const char *, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_create_process(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
