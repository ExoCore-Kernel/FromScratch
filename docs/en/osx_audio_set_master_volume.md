<!-- auto-generated -->
# osx_audio_set_master_volume

**Type:** `osx_audio_set_master_volume`

**Display label:** set master volume volume

**Kind:** statement (command)

**Category:** Audio

## Arguments

- **volume** (number) — input slot 1

## Generated C call

```c
blockos_ext_audio_set_master_volume(/* volume */);
```

## Runtime prototype

```c
void blockos_ext_audio_set_master_volume(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_audio_set_master_volume(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
