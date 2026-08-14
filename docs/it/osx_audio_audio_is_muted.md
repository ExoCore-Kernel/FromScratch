<!-- auto-generated -->
# osx_audio_audio_is_muted

**Type:** `osx_audio_audio_is_muted`

**Etichetta visualizzata:** audio is muted

**Tipo blocco:** booleano

**Categoria:** Audio

## Espressione C generata

```c
(bool) blockos_ext_audio_audio_is_muted()
```

## Prototipo runtime

```c
bool blockos_ext_audio_audio_is_muted(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_audio_is_muted();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
