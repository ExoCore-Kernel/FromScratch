<!-- auto-generated -->
# osx_graphics_enable_back_buffer

**Type:** `osx_graphics_enable_back_buffer`

**Display label:** enable graphics back buffer enabled

**Kind:** statement (command)

**Category:** Graphics

## Arguments

- **enabled** (boolean) — input slot 1

## Generated C call

```c
blockos_ext_graphics_enable_back_buffer(/* enabled */);
```

## Runtime prototype

```c
void blockos_ext_graphics_enable_back_buffer(bool);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_graphics_enable_back_buffer(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
