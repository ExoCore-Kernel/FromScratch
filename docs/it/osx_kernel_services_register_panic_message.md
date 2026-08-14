<!-- auto-generated -->
# osx_kernel_services_register_panic_message

**Type:** `osx_kernel_services_register_panic_message`

**Etichetta visualizzata:** register panic message message

**Tipo blocco:** comando

**Categoria:** Kernel services

## Argomenti

- **message** (stringa) — slot di input 1

## Chiamata C generata

```c
blockos_ext_kernel_services_register_panic_message(/* message */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_services_register_panic_message(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_services_register_panic_message(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
