<!-- auto-generated -->
# osx_filesystems_seek_file

**Type:** `osx_filesystems_seek_file`

**Display label:** seek file handle offset mode

**Kind:** number value

**Category:** Filesystems

## Arguments

- **handle** (number) — input slot 1
- **offset** (number) — input slot 2
- **mode** (number) — input slot 3

## Generated C expression

```c
(uint64_t) blockos_ext_filesystems_seek_file(/* handle */, /* offset */, /* mode */)
```

## Runtime prototype

```c
uint64_t blockos_ext_filesystems_seek_file(uint64_t, uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_seek_file(0, 0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
