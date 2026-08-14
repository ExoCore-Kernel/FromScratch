<!-- auto-generated -->
# osx_interrupts_send_end_of_interrupt

**Type:** `osx_interrupts_send_end_of_interrupt`

**Etichetta visualizzata:** send end of interrupt irq

**Tipo blocco:** comando

**Categoria:** Interrupts

## Argomenti

- **irq** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_interrupts_send_end_of_interrupt(/* irq */);
```

## Prototipo runtime

```c
void blockos_ext_interrupts_send_end_of_interrupt(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_interrupts_send_end_of_interrupt(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
