<!-- auto-generated -->
# osx_interrupts_register_interrupt_handler

**Type:** `osx_interrupts_register_interrupt_handler`

**Etichetta visualizzata:** register interrupt handler vector handler address

**Tipo blocco:** comando

**Categoria:** Interrupts

## Argomenti

- **vector** (numero) — slot di input 1
- **handler address** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_interrupts_register_interrupt_handler(/* vector */, /* handler address */);
```

## Prototipo runtime

```c
void blockos_ext_interrupts_register_interrupt_handler(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_interrupts_register_interrupt_handler(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
