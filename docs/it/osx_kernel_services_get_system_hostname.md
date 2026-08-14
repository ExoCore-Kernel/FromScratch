<!-- auto-generated -->
# osx_kernel_services_get_system_hostname

**Type:** `osx_kernel_services_get_system_hostname`

**Etichetta visualizzata:** get system hostname

**Tipo blocco:** stringa

**Categoria:** Kernel services

## Espressione C generata

```c
(const char *) blockos_ext_kernel_services_get_system_hostname()
```

## Prototipo runtime

```c
const char * blockos_ext_kernel_services_get_system_hostname(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_get_system_hostname();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
