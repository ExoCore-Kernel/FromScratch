<!-- auto-generated -->
# osx_audio_submit_audio_buffer

**Type:** `osx_audio_submit_audio_buffer`

**Etichetta visualizzata:** submit audio buffer address frames

**Tipo blocco:** numero

**Categoria:** Audio

## Argomenti

- **address** (numero) — slot di input 1
- **frames** (numero) — slot di input 2

## Espressione C generata

```c
(uint64_t) blockos_ext_audio_submit_audio_buffer(/* address */, /* frames */)
```

## Prototipo runtime

```c
uint64_t blockos_ext_audio_submit_audio_buffer(uint64_t, uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_submit_audio_buffer(0, 0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
