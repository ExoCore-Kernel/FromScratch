<!-- auto-generated -->
# osx_audio_play_audio_tone

**Type:** `osx_audio_play_audio_tone`

**Display label:** play audio tone frequency duration ms

**Kind:** statement (command)

**Category:** Audio

## Arguments

- **frequency** (number) — input slot 1
- **duration ms** (number) — input slot 2

## Generated C call

```c
blockos_ext_audio_play_audio_tone(/* frequency */, /* duration ms */);
```

## Runtime prototype

```c
void blockos_ext_audio_play_audio_tone(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_audio_play_audio_tone(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
