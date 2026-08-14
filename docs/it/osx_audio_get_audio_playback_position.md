<!-- auto-generated -->
# osx_audio_get_audio_playback_position

**Type:** `osx_audio_get_audio_playback_position`

**Etichetta visualizzata:** get audio playback position

**Tipo blocco:** numero

**Categoria:** Audio

## Espressione C generata

```c
(uint64_t) blockos_ext_audio_get_audio_playback_position()
```

## Prototipo runtime

```c
uint64_t blockos_ext_audio_get_audio_playback_position(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_get_audio_playback_position();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
