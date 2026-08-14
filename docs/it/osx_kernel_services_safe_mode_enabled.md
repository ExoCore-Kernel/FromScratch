<!-- auto-generated -->
# osx_kernel_services_safe_mode_enabled

**Type:** `osx_kernel_services_safe_mode_enabled`

**Etichetta visualizzata:** safe mode enabled

**Tipo blocco:** booleano

**Categoria:** Kernel services

## Espressione C generata

```c
(bool) blockos_ext_kernel_services_safe_mode_enabled()
```

## Prototipo runtime

```c
bool blockos_ext_kernel_services_safe_mode_enabled(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_kernel_services_safe_mode_enabled();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
