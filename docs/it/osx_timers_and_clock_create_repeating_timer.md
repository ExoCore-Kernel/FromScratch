<!-- auto-generated -->
# osx_timers_and_clock_create_repeating_timer

**Type:** `osx_timers_and_clock_create_repeating_timer`

**Etichetta visualizzata:** create repeating timer period callback address

**Tipo blocco:** numero

**Categoria:** Timers and clock

## Argomenti

- **period** (numero) — slot di input 1
- **callback address** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_timers_and_clock_create_repeating_timer(/* period */, /* callback address */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_timers_and_clock_create_repeating_timer(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_create_repeating_timer(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
