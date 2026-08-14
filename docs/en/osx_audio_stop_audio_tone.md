<!-- auto-generated -->
# osx_audio_stop_audio_tone

**Type:** `osx_audio_stop_audio_tone`

**Display label:** stop audio tone

**Kind:** statement (command)

**Category:** Audio

## Generated C call

```c
blockos_ext_audio_stop_audio_tone();
```

## Runtime prototype

```c
void blockos_ext_audio_stop_audio_tone(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_audio_stop_audio_tone();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
