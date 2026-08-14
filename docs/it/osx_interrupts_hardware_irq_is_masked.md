<!-- auto-generated -->
# osx_interrupts_hardware_irq_is_masked

**Type:** `osx_interrupts_hardware_irq_is_masked`

**Etichetta visualizzata:** hardware IRQ is masked irq

**Tipo blocco:** booleano

**Categoria:** Interrupts

## Argomenti

- **irq** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_interrupts_hardware_irq_is_masked(/* irq */)
```

## Prototipo runtime

```c
bool blockos_ext_interrupts_hardware_irq_is_masked(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_interrupts_hardware_irq_is_masked(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
