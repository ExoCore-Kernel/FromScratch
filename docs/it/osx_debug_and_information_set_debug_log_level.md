<!-- auto-generated -->
# osx_debug_and_information_set_debug_log_level

**Type:** `osx_debug_and_information_set_debug_log_level`

**Etichetta visualizzata:** set debug log level level

**Tipo blocco:** comando

**Categoria:** Debug and information

## Argomenti

- **level** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_debug_and_information_set_debug_log_level(/* level */);
```

## Prototipo runtime

```c
void blockos_ext_debug_and_information_set_debug_log_level(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_set_debug_log_level(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
