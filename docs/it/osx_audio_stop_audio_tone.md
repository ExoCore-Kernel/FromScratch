<!-- auto-generated -->
# osx_audio_stop_audio_tone

**Type:** `osx_audio_stop_audio_tone`

**Etichetta visualizzata:** stop audio tone

**Tipo blocco:** comando

**Categoria:** Audio

## Chiamata C generata

```c
blockos_ext_audio_stop_audio_tone();
```

## Prototipo runtime

```c
void blockos_ext_audio_stop_audio_tone(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_audio_stop_audio_tone();
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
