<!-- auto-generated -->
# osx_audio_set_audio_muted

**Type:** `osx_audio_set_audio_muted`

**Display label:** set audio muted muted

**Kind:** statement (command)

**Category:** Audio

## Arguments

- **muted** (boolean) — input slot 1

## Generated C call

```c
blockos_ext_audio_set_audio_muted(/* muted */);
```

## Runtime prototype

```c
void blockos_ext_audio_set_audio_muted(bool);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_audio_set_audio_muted(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
