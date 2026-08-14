<!-- auto-generated -->
# osx_audio_play_audio_tone

**Type:** `osx_audio_play_audio_tone`

**Etichetta visualizzata:** play audio tone frequency duration ms

**Tipo blocco:** comando

**Categoria:** Audio

## Argomenti

- **frequency** (numero) — slot di input 1
- **duration ms** (numero) — slot di input 2

## Chiamata C generata

```c
blockos_ext_audio_play_audio_tone(/* frequency */, /* duration ms */);
```

## Prototipo runtime

```c
void blockos_ext_audio_play_audio_tone(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_audio_play_audio_tone(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
