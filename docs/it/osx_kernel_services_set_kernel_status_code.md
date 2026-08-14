<!-- auto-generated -->
# osx_kernel_services_set_kernel_status_code

**Type:** `osx_kernel_services_set_kernel_status_code`

**Etichetta visualizzata:** set kernel status code code

**Tipo blocco:** comando

**Categoria:** Kernel services

## Argomenti

- **code** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_kernel_services_set_kernel_status_code(/* code */);
```

## Prototipo runtime

```c
void blockos_ext_kernel_services_set_kernel_status_code(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_kernel_services_set_kernel_status_code(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
