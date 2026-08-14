<!-- auto-generated -->
# osx_audio_pause_audio_playback

**Type:** `osx_audio_pause_audio_playback`

**Display label:** pause audio playback

**Kind:** statement (command)

**Category:** Audio

## Generated C call

```c
blockos_ext_audio_pause_audio_playback();
```

## Runtime prototype

```c
void blockos_ext_audio_pause_audio_playback(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_audio_pause_audio_playback();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
