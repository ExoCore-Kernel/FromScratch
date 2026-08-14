<!-- auto-generated -->
# osx_interrupts_get_interrupt_count

**Type:** `osx_interrupts_get_interrupt_count`

**Etichetta visualizzata:** get interrupt count vector

**Tipo blocco:** numero

**Categoria:** Interrupts

## Argomenti

- **vector** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_interrupts_get_interrupt_count(/* vector */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_interrupts_get_interrupt_count(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_interrupts_get_interrupt_count(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
