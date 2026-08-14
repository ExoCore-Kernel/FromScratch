<!-- auto-generated -->
# osx_filesystems_get_directory_entry_name

**Type:** `osx_filesystems_get_directory_entry_name`

**Display label:** get directory entry name path index

**Kind:** string value

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1
- **index** (number) — input slot 2

## Generated C expression

```c
(const char *) blockos_ext_filesystems_get_directory_entry_name(/* path */, /* index */)
```

## Runtime prototype

```c
const char * blockos_ext_filesystems_get_directory_entry_name(const char *, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_get_directory_entry_name(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
