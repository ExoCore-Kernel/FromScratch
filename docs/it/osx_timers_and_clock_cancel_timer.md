<!-- auto-generated -->
# osx_timers_and_clock_cancel_timer

**Type:** `osx_timers_and_clock_cancel_timer`

**Etichetta visualizzata:** cancel timer timer id

**Tipo blocco:** comando

**Categoria:** Timers and clock

## Argomenti

- **timer id** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_timers_and_clock_cancel_timer(/* timer id */);
```

## Prototipo runtime

```c
void blockos_ext_timers_and_clock_cancel_timer(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_timers_and_clock_cancel_timer(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
