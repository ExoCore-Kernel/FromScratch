<!-- auto-generated -->
# osx_timers_and_clock_convert_ticks_to_milliseconds

**Type:** `osx_timers_and_clock_convert_ticks_to_milliseconds`

**Etichetta visualizzata:** convert ticks to milliseconds ticks

**Tipo blocco:** numero

**Categoria:** Timers and clock

## Argomenti

- **ticks** (numero) — slot di input 1

## Espressione C generata

```c
(uint64_t) blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(/* ticks */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
