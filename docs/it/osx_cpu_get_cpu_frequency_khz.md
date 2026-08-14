<!-- auto-generated -->
# osx_cpu_get_cpu_frequency_khz

**Type:** `osx_cpu_get_cpu_frequency_khz`

**Etichetta visualizzata:** get CPU frequency kHz

**Tipo blocco:** numero

**Categoria:** CPU

## Espressione C generata

```c
(uint64_t) blockos_ext_cpu_get_cpu_frequency_khz()
```

## Prototipo runtime

```c
uint64_t blockos_ext_cpu_get_cpu_frequency_khz(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_get_cpu_frequency_khz();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
