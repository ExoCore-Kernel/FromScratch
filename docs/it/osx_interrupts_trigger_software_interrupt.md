<!-- auto-generated -->
# osx_interrupts_trigger_software_interrupt

**Type:** `osx_interrupts_trigger_software_interrupt`

**Etichetta visualizzata:** trigger software interrupt vector

**Tipo blocco:** comando

**Categoria:** Interrupts

## Argomenti

- **vector** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_interrupts_trigger_software_interrupt(/* vector */);
```

## Prototipo runtime

```c
void blockos_ext_interrupts_trigger_software_interrupt(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_interrupts_trigger_software_interrupt(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
