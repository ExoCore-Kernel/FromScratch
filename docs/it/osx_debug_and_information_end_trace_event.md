<!-- auto-generated -->
# osx_debug_and_information_end_trace_event

**Type:** `osx_debug_and_information_end_trace_event`

**Etichetta visualizzata:** end trace event name

**Tipo blocco:** comando

**Categoria:** Debug and information

## Argomenti

- **name** (stringa) — slot di input 1

## Chiamata C generata

```c
blockos_ext_debug_and_information_end_trace_event(/* name */);
```

## Prototipo runtime

```c
void blockos_ext_debug_and_information_end_trace_event(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_end_trace_event(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
