<!-- auto-generated -->
# osx_interrupts_allocate_interrupt_vector

**Type:** `osx_interrupts_allocate_interrupt_vector`

**Etichetta visualizzata:** allocate interrupt vector

**Tipo blocco:** numero

**Categoria:** Interrupts

## Espressione C generata

```c
(uint64_t) blockos_ext_interrupts_allocate_interrupt_vector()
```

## Prototipo runtime

```c
uint64_t blockos_ext_interrupts_allocate_interrupt_vector(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_interrupts_allocate_interrupt_vector();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
