<!-- auto-generated -->
# osx_filesystems_mount_filesystem

**Type:** `osx_filesystems_mount_filesystem`

**Display label:** mount filesystem device path type

**Kind:** number value

**Category:** Filesystems

## Arguments

- **device** (string) — input slot 1
- **path** (string) — input slot 2
- **type** (string) — input slot 3

## Generated C expression

```c
(uint64_t) blockos_ext_filesystems_mount_filesystem(/* device */, /* path */, /* type */)
```

## Runtime prototype

```c
uint64_t blockos_ext_filesystems_mount_filesystem(const char *, const char *, const char *);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_mount_filesystem(0, 0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
