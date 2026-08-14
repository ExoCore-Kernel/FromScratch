<!-- auto-generated -->
# osx_debug_and_information_write_debug_number

**Type:** `osx_debug_and_information_write_debug_number`

**Etichetta visualizzata:** write debug number value

**Tipo blocco:** comando

**Categoria:** Debug and information

## Argomenti

- **value** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_debug_and_information_write_debug_number(/* value */);
```

## Prototipo runtime

```c
void blockos_ext_debug_and_information_write_debug_number(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_write_debug_number(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
