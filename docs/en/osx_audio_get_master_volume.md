<!-- auto-generated -->
# osx_audio_get_master_volume

**Type:** `osx_audio_get_master_volume`

**Display label:** get master volume

**Kind:** number value

**Category:** Audio

## Generated C expression

```c
(uint64_t) blockos_ext_audio_get_master_volume()
```

## Runtime prototype

```c
uint64_t blockos_ext_audio_get_master_volume(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_get_master_volume();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
