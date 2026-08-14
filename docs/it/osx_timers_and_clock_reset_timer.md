<!-- auto-generated -->
# osx_timers_and_clock_reset_timer

**Type:** `osx_timers_and_clock_reset_timer`

**Etichetta visualizzata:** reset timer timer id delay

**Tipo blocco:** comando

**Categoria:** Timers and clock

## Argomenti

- **timer id** (numero) — slot di input 1
- **delay** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_timers_and_clock_reset_timer(/* timer id */, /* delay */);
```

## Prototipo runtime

```c
void blockos_ext_timers_and_clock_reset_timer(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_reset_timer(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
