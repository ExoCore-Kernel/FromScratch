<!-- auto-generated -->
# osx_audio_initialize_audio_subsystem

**Type:** `osx_audio_initialize_audio_subsystem`

**Display label:** initialize audio subsystem

**Kind:** statement (command)

**Category:** Audio

## Generated C call

```c
blockos_ext_audio_initialize_audio_subsystem();
```

## Runtime prototype

```c
void blockos_ext_audio_initialize_audio_subsystem(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_audio_initialize_audio_subsystem();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
