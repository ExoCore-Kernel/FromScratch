<!-- auto-generated -->
# osx_audio_get_master_volume

**Type:** `osx_audio_get_master_volume`

**Etichetta visualizzata:** get master volume

**Tipo blocco:** numero

**Categoria:** Audio

## Espressione C generata

```c
(uint64_t) blockos_ext_audio_get_master_volume()
```

## Prototipo runtime

```c
uint64_t blockos_ext_audio_get_master_volume(void);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_get_master_volume();
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
