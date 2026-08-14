<!-- auto-generated -->
# osx_cpu_pause_cpu_briefly

**Type:** `osx_cpu_pause_cpu_briefly`

**Etichetta visualizzata:** pause CPU briefly

**Tipo blocco:** comando

**Categoria:** CPU

## Chiamata C generata

```c
blockos_ext_cpu_pause_cpu_briefly();
```

## Prototipo runtime

```c
void blockos_ext_cpu_pause_cpu_briefly(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_cpu_pause_cpu_briefly();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
