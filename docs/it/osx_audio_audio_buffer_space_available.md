<!-- auto-generated -->
# osx_audio_audio_buffer_space_available

**Type:** `osx_audio_audio_buffer_space_available`

**Etichetta visualizzata:** audio buffer space available

**Tipo blocco:** booleano

**Categoria:** Audio

## Espressione C generata

```c
(bool) blockos_ext_audio_audio_buffer_space_available()
```

## Prototipo runtime

```c
bool blockos_ext_audio_audio_buffer_space_available(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_audio_buffer_space_available();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
