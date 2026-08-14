<!-- auto-generated -->
# osx_audio_pause_audio_playback

**Type:** `osx_audio_pause_audio_playback`

**Etichetta visualizzata:** pause audio playback

**Tipo blocco:** comando

**Categoria:** Audio

## Chiamata C generata

```c
blockos_ext_audio_pause_audio_playback();
```

## Prototipo runtime

```c
void blockos_ext_audio_pause_audio_playback(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_audio_pause_audio_playback();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
