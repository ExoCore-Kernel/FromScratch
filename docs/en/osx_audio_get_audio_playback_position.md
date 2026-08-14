<!-- auto-generated -->
# osx_audio_get_audio_playback_position

**Type:** `osx_audio_get_audio_playback_position`

**Display label:** get audio playback position

**Kind:** number value

**Category:** Audio

## Generated C expression

```c
(uint64_t) blockos_ext_audio_get_audio_playback_position()
```

## Runtime prototype

```c
uint64_t blockos_ext_audio_get_audio_playback_position(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_get_audio_playback_position();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
