<!-- auto-generated -->
# osx_synchronization_unlock_spinlock

**Type:** `osx_synchronization_unlock_spinlock`

**Etichetta visualizzata:** unlock spinlock spinlock

**Tipo blocco:** comando

**Categoria:** Synchronization

## Argomenti

- **spinlock** (numero) — slot di input 1

## Chiamata C generata

```c
blockos_ext_synchronization_unlock_spinlock(/* spinlock */);
```

## Prototipo runtime

```c
void blockos_ext_synchronization_unlock_spinlock(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    blockos_ext_synchronization_unlock_spinlock(0);
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
