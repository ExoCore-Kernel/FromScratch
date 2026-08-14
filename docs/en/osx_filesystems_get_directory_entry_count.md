<!-- auto-generated -->
# osx_filesystems_get_directory_entry_count

**Type:** `osx_filesystems_get_directory_entry_count`

**Display label:** get directory entry count path

**Kind:** number value

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_filesystems_get_directory_entry_count(/* path */)
```

## Runtime prototype

```c
uint64_t blockos_ext_filesystems_get_directory_entry_count(const char *);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_get_directory_entry_count(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
