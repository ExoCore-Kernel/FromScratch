<!-- auto-generated -->
# osx_cpu_write_control_register

**Type:** `osx_cpu_write_control_register`

**Etichetta visualizzata:** write control register register value

**Tipo blocco:** comando

**Categoria:** CPU

## Argomenti

- **register** (numero) — slot di input 1
- **value** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_cpu_write_control_register(/* register */, /* value */);
```

## Prototipo runtime

```c
void blockos_ext_cpu_write_control_register(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_cpu_write_control_register(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
