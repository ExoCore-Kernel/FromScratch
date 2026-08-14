<!-- auto-generated -->
# osx_kernel_services_get_boot_stage

**Type:** `osx_kernel_services_get_boot_stage`

**Etichetta visualizzata:** get boot stage

**Tipo blocco:** numero

**Categoria:** Kernel services

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_services_get_boot_stage()
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_services_get_boot_stage(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_get_boot_stage();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
