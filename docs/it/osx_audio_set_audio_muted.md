<!-- auto-generated -->
# osx_audio_set_audio_muted

**Type:** `osx_audio_set_audio_muted`

**Etichetta visualizzata:** set audio muted muted

**Tipo blocco:** comando

**Categoria:** Audio

## Argomenti

- **muted** (booleano) — slot di input 1

## Chiamata C generata

```c
blockos_ext_audio_set_audio_muted(/* muted */);
```

## Prototipo runtime

```c
void blockos_ext_audio_set_audio_muted(bool);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_audio_set_audio_muted(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
