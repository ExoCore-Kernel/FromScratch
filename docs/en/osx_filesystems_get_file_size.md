<!-- auto-generated -->
# osx_filesystems_get_file_size

**Type:** `osx_filesystems_get_file_size`

**Display label:** get file size path

**Kind:** number value

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_filesystems_get_file_size(/* path */)
```

## Runtime prototype

```c
uint64_t blockos_ext_filesystems_get_file_size(const char *);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_get_file_size(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
