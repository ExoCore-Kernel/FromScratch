<!-- auto-generated -->
# osx_cpu_read_control_register

**Type:** `osx_cpu_read_control_register`

**Etichetta visualizzata:** read control register register

**Tipo blocco:** numero

**Categoria:** CPU

## Argomenti

- **register** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_cpu_read_control_register(/* register */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_cpu_read_control_register(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_cpu_read_control_register(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
