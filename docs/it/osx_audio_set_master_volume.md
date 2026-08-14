<!-- auto-generated -->
# osx_audio_set_master_volume

**Type:** `osx_audio_set_master_volume`

**Etichetta visualizzata:** set master volume volume

**Tipo blocco:** comando

**Categoria:** Audio

## Argomenti

- **volume** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_audio_set_master_volume(/* volume */);
```

## Prototipo runtime

```c
void blockos_ext_audio_set_master_volume(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_audio_set_master_volume(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
