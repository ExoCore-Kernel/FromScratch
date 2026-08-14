<!-- auto-generated -->
# osx_audio_get_audio_sample_rate

**Type:** `osx_audio_get_audio_sample_rate`

**Etichetta visualizzata:** get audio sample rate

**Tipo blocco:** numero

**Categoria:** Audio

## Espressione C generata

```c
(uint64_t) blockos_ext_audio_get_audio_sample_rate()
```

## Prototipo runtime

```c
uint64_t blockos_ext_audio_get_audio_sample_rate(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_get_audio_sample_rate();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
