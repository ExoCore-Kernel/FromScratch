<!-- auto-generated -->
# osx_storage_devices_disk_is_present

**Type:** `osx_storage_devices_disk_is_present`

**Etichetta visualizzata:** disk is present disk

**Tipo blocco:** booleano

**Categoria:** Storage devices

## Argomenti

- **disk** (numero) — slot di input 1

## Espressione C generata

```c
(bool) blockos_ext_storage_devices_disk_is_present(/* disk */)
```

## Prototipo runtime

```c
bool blockos_ext_storage_devices_disk_is_present(uint64_t);
```

## Esempio di composizione

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_storage_devices_disk_is_present(0);
    (void)result;
}
```

## Note

- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.
- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.
- L'etichetta visualizzata è generata dal template `message0` del blocco.
