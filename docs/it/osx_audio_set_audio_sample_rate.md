<!-- auto-generated -->
# osx_audio_set_audio_sample_rate

**Type:** `osx_audio_set_audio_sample_rate`

**Etichetta visualizzata:** set audio sample rate sample rate

**Tipo blocco:** comando

**Categoria:** Audio

## Argomenti

- **sample rate** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_audio_set_audio_sample_rate(/* sample rate */);
```

## Prototipo runtime

```c
void blockos_ext_audio_set_audio_sample_rate(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_audio_set_audio_sample_rate(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
