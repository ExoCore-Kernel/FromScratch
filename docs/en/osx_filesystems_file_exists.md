<!-- auto-generated -->
# osx_filesystems_file_exists

**Type:** `osx_filesystems_file_exists`

**Display label:** file exists path

**Kind:** boolean value

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_filesystems_file_exists(/* path */)
```

## Runtime prototype

```c
bool blockos_ext_filesystems_file_exists(const char *);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_file_exists(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
