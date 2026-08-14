<!-- auto-generated -->
# osx_debug_and_information_write_debug_text

**Type:** `osx_debug_and_information_write_debug_text`

**Display label:** write debug text text

**Kind:** statement (command)

**Category:** Debug and information

## Arguments

- **text** (string) — input slot 1

## Generated C call

```c
blockos_ext_debug_and_information_write_debug_text(/* text */);
```

## Runtime prototype

```c
void blockos_ext_debug_and_information_write_debug_text(const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_debug_and_information_write_debug_text(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
