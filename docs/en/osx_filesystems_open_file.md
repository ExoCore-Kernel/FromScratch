<!-- auto-generated -->
# osx_filesystems_open_file

**Type:** `osx_filesystems_open_file`

**Display label:** open file path flags

**Kind:** number value

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1
- **flags** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_filesystems_open_file(/* path */, /* flags */)
```

## Runtime prototype

```c
uint64_t blockos_ext_filesystems_open_file(const char *, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_open_file(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
