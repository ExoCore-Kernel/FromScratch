<!-- auto-generated -->
# osx_audio_audio_buffer_space_available

**Type:** `osx_audio_audio_buffer_space_available`

**Display label:** audio buffer space available

**Kind:** boolean value

**Category:** Audio

## Generated C expression

```c
(bool) blockos_ext_audio_audio_buffer_space_available()
```

## Runtime prototype

```c
bool blockos_ext_audio_audio_buffer_space_available(void);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_audio_buffer_space_available();
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
