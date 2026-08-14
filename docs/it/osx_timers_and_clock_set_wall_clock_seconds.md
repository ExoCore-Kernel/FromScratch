<!-- auto-generated -->
# osx_timers_and_clock_set_wall_clock_seconds

**Type:** `osx_timers_and_clock_set_wall_clock_seconds`

**Etichetta visualizzata:** set wall clock seconds seconds

**Tipo blocco:** comando

**Categoria:** Timers and clock

## Argomenti

- **seconds** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_timers_and_clock_set_wall_clock_seconds(/* seconds */);
```

## Prototipo runtime

```c
void blockos_ext_timers_and_clock_set_wall_clock_seconds(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_set_wall_clock_seconds(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
