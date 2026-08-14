<!-- auto-generated -->
# osx_cpu_enable_cpu_interrupts

**Type:** `osx_cpu_enable_cpu_interrupts`

**Etichetta visualizzata:** enable CPU interrupts

**Tipo blocco:** comando

**Categoria:** CPU

## Chiamata C generata

```c
blockos_ext_cpu_enable_cpu_interrupts();
```

## Prototipo runtime

```c
void blockos_ext_cpu_enable_cpu_interrupts(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_cpu_enable_cpu_interrupts();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
