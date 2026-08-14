<!-- auto-generated -->
# osx_timers_and_clock_get_timer_remaining_ticks

**Type:** `osx_timers_and_clock_get_timer_remaining_ticks`

**Etichetta visualizzata:** get timer remaining ticks timer id

**Tipo blocco:** numero

**Categoria:** Timers and clock

## Argomenti

- **timer id** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_timers_and_clock_get_timer_remaining_ticks(/* timer id */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_timers_and_clock_get_timer_remaining_ticks(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_get_timer_remaining_ticks(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
