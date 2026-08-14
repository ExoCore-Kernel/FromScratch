<!-- auto-generated -->
# osx_interrupts_install_interrupt_table

**Type:** `osx_interrupts_install_interrupt_table`

**Etichetta visualizzata:** install interrupt table

**Tipo blocco:** comando

**Categoria:** Interrupts

## Chiamata C generata

```c
blockos_ext_interrupts_install_interrupt_table();
```

## Prototipo runtime

```c
void blockos_ext_interrupts_install_interrupt_table(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_interrupts_install_interrupt_table();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
