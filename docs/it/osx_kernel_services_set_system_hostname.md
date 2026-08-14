<!-- auto-generated -->
# osx_kernel_services_set_system_hostname

**Type:** `osx_kernel_services_set_system_hostname`

**Etichetta visualizzata:** set system hostname hostname

**Tipo blocco:** comando

**Categoria:** Kernel services

## Argomenti

- **hostname** (stringa) — slot di input 1

## Chiamata C generata

```c
blockos_ext_kernel_services_set_system_hostname(/* hostname */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_services_set_system_hostname(const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_services_set_system_hostname(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
