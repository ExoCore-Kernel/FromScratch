<!-- auto-generated -->
# osx_kernel_services_get_kernel_status_code

**Type:** `osx_kernel_services_get_kernel_status_code`

**Etichetta visualizzata:** get kernel status code

**Tipo blocco:** numero

**Categoria:** Kernel services

## Espressione C generata

```c
(uint64_t) blockos_ext_kernel_services_get_kernel_status_code()
```

## Prototipo runtime

```c
uint64_t blockos_ext_kernel_services_get_kernel_status_code(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_get_kernel_status_code();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
