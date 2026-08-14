<!-- auto-generated -->
# osx_audio_audio_is_muted

**Type:** `osx_audio_audio_is_muted`

**Display label:** audio is muted

**Kind:** boolean value

**Category:** Audio

## Generated C expression

```c
(bool) blockos_ext_audio_audio_is_muted()
```

## Runtime prototype

```c
bool blockos_ext_audio_audio_is_muted(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_audio_is_muted();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
