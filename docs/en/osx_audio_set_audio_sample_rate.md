<!-- auto-generated -->
# osx_audio_set_audio_sample_rate

**Type:** `osx_audio_set_audio_sample_rate`

**Display label:** set audio sample rate sample rate

**Kind:** statement (command)

**Category:** Audio

## Arguments

- **sample rate** (number) — input slot 1

## Generated C call

```c
blockos_ext_audio_set_audio_sample_rate(/* sample rate */);
```

## Runtime prototype

```c
void blockos_ext_audio_set_audio_sample_rate(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_audio_set_audio_sample_rate(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
