<!-- auto-generated -->
# osx_interrupts_release_interrupt_vector

**Type:** `osx_interrupts_release_interrupt_vector`

**Etichetta visualizzata:** release interrupt vector vector

**Tipo blocco:** comando

**Categoria:** Interrupts

## Argomenti

- **vector** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_interrupts_release_interrupt_vector(/* vector */);
```

## Prototipo runtime

```c
void blockos_ext_interrupts_release_interrupt_vector(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_interrupts_release_interrupt_vector(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
