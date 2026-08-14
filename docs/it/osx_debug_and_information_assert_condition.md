<!-- auto-generated -->
# osx_debug_and_information_assert_condition

**Type:** `osx_debug_and_information_assert_condition`

**Etichetta visualizzata:** assert condition condition message

**Tipo blocco:** comando

**Categoria:** Debug and information

## Argomenti

- **condition** (booleano) — slot di input 1
- **message** (stringa) — slot di input 2

## Chiamata C generata

```c
blockos_ext_debug_and_information_assert_condition(/* condition */, /* message */);
```

## Prototipo runtime

```c
void blockos_ext_debug_and_information_assert_condition(bool, const char *);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_assert_condition(0, 0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
