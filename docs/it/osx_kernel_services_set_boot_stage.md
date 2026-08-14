<!-- auto-generated -->
# osx_kernel_services_set_boot_stage

**Type:** `osx_kernel_services_set_boot_stage`

**Etichetta visualizzata:** set boot stage stage

**Tipo blocco:** comando

**Categoria:** Kernel services

## Argomenti

- **stage** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_kernel_services_set_boot_stage(/* stage */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_services_set_boot_stage(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_services_set_boot_stage(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
