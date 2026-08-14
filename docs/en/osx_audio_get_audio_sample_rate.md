<!-- auto-generated -->
# osx_audio_get_audio_sample_rate

**Type:** `osx_audio_get_audio_sample_rate`

**Display label:** get audio sample rate

**Kind:** number value

**Category:** Audio

## Generated C expression

```c
(uint64_t) blockos_ext_audio_get_audio_sample_rate()
```

## Runtime prototype

```c
uint64_t blockos_ext_audio_get_audio_sample_rate(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_get_audio_sample_rate();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
