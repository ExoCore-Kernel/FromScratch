<!-- auto-generated -->
# osx_kernel_services_request_system_restart

**Type:** `osx_kernel_services_request_system_restart`

**Etichetta visualizzata:** request system restart

**Tipo blocco:** comando

**Categoria:** Kernel services

## Chiamata C generata

```c
blockos_ext_kernel_services_request_system_restart();
```

## Prototipo runtime

```c
void blockos_ext_kernel_services_request_system_restart(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_services_request_system_restart();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
