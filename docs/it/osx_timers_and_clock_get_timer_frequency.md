<!-- auto-generated -->
# osx_timers_and_clock_get_timer_frequency

**Type:** `osx_timers_and_clock_get_timer_frequency`

**Etichetta visualizzata:** get timer frequency

**Tipo blocco:** numero

**Categoria:** Timers and clock

## Espressione C generata

```c
(uint64_t) blockos_ext_timers_and_clock_get_timer_frequency()
```

## Prototipo runtime

```c
uint64_t blockos_ext_timers_and_clock_get_timer_frequency(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_get_timer_frequency();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
