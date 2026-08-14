<!-- auto-generated -->
# osx_kernel_services_get_boot_command_line

**Type:** `osx_kernel_services_get_boot_command_line`

**Etichetta visualizzata:** get boot command line

**Tipo blocco:** stringa

**Categoria:** Kernel services

## Espressione C generata

```c
(const char *) blockos_ext_kernel_services_get_boot_command_line()
```

## Prototipo runtime

```c
const char * blockos_ext_kernel_services_get_boot_command_line(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_get_boot_command_line();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
