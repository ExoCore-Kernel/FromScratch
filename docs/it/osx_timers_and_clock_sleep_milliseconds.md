<!-- auto-generated -->
# osx_timers_and_clock_sleep_milliseconds

**Type:** `osx_timers_and_clock_sleep_milliseconds`

**Etichetta visualizzata:** sleep milliseconds milliseconds

**Tipo blocco:** comando

**Categoria:** Timers and clock

## Argomenti

- **milliseconds** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_timers_and_clock_sleep_milliseconds(/* milliseconds */);
```

## Prototipo runtime

```c
void blockos_ext_timers_and_clock_sleep_milliseconds(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_sleep_milliseconds(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
