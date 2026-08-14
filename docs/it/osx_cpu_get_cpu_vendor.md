<!-- auto-generated -->
# osx_cpu_get_cpu_vendor

**Type:** `osx_cpu_get_cpu_vendor`

**Etichetta visualizzata:** get CPU vendor

**Tipo blocco:** stringa

**Categoria:** CPU

## Espressione C generata

```c
(const char *) blockos_ext_cpu_get_cpu_vendor()
```

## Prototipo runtime

```c
const char * blockos_ext_cpu_get_cpu_vendor(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_get_cpu_vendor();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
