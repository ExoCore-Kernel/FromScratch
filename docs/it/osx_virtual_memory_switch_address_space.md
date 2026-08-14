<!-- auto-generated -->
# osx_virtual_memory_switch_address_space

**Type:** `osx_virtual_memory_switch_address_space`

**Etichetta visualizzata:** switch address space address space

**Tipo blocco:** comando

**Categoria:** Virtual memory

## Argomenti

- **address space** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_virtual_memory_switch_address_space(/* address space */);
```

## Prototipo runtime

```c
void blockos_ext_virtual_memory_switch_address_space(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_virtual_memory_switch_address_space(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
