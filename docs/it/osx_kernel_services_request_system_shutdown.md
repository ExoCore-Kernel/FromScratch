<!-- auto-generated -->
# osx_kernel_services_request_system_shutdown

**Type:** `osx_kernel_services_request_system_shutdown`

**Etichetta visualizzata:** request system shutdown

**Tipo blocco:** comando

**Categoria:** Kernel services

## Chiamata C generata

```c
blockos_ext_kernel_services_request_system_shutdown();
```

## Prototipo runtime

```c
void blockos_ext_kernel_services_request_system_shutdown(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_services_request_system_shutdown();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
