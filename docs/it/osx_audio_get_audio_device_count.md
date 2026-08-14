<!-- auto-generated -->
# osx_audio_get_audio_device_count

**Type:** `osx_audio_get_audio_device_count`

**Etichetta visualizzata:** get audio device count

**Tipo blocco:** numero

**Categoria:** Audio

## Espressione C generata

```c
(uint64_t) blockos_ext_audio_get_audio_device_count()
```

## Prototipo runtime

```c
uint64_t blockos_ext_audio_get_audio_device_count(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_get_audio_device_count();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
