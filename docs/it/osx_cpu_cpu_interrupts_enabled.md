<!-- auto-generated -->
# osx_cpu_cpu_interrupts_enabled

**Type:** `osx_cpu_cpu_interrupts_enabled`

**Etichetta visualizzata:** CPU interrupts enabled

**Tipo blocco:** booleano

**Categoria:** CPU

## Espressione C generata

```c
(bool) blockos_ext_cpu_cpu_interrupts_enabled()
```

## Prototipo runtime

```c
bool blockos_ext_cpu_cpu_interrupts_enabled(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_cpu_interrupts_enabled();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
