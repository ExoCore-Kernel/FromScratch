<!-- auto-generated -->
# osx_audio_submit_audio_buffer

**Type:** `osx_audio_submit_audio_buffer`

**Display label:** submit audio buffer address frames

**Kind:** number value

**Category:** Audio

## Arguments

- **address** (number) — input slot 1
- **frames** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_audio_submit_audio_buffer(/* address */, /* frames */)
```

## Runtime prototype

```c
uint64_t blockos_ext_audio_submit_audio_buffer(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_audio_submit_audio_buffer(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
