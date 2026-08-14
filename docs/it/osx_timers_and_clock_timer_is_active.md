<!-- auto-generated -->
# osx_timers_and_clock_timer_is_active

**Type:** `osx_timers_and_clock_timer_is_active`

**Etichetta visualizzata:** timer is active timer id

**Tipo blocco:** booleano

**Categoria:** Timers and clock

## Argomenti

- **timer id** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_timers_and_clock_timer_is_active(/* timer id */)
```

## Prototipo runtime

```c
bool blockos_ext_timers_and_clock_timer_is_active(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_timers_and_clock_timer_is_active(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
