<!-- auto-generated -->
# osx_interrupts_disable_non_maskable_interrupts

**Type:** `osx_interrupts_disable_non_maskable_interrupts`

**Etichetta visualizzata:** disable non-maskable interrupts

**Tipo blocco:** comando

**Categoria:** Interrupts

## Chiamata C generata

```c
blockos_ext_interrupts_disable_non_maskable_interrupts();
```

## Prototipo runtime

```c
void blockos_ext_interrupts_disable_non_maskable_interrupts(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_interrupts_disable_non_maskable_interrupts();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
