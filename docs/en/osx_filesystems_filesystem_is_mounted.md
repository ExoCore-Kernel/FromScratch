<!-- auto-generated -->
# osx_filesystems_filesystem_is_mounted

**Type:** `osx_filesystems_filesystem_is_mounted`

**Display label:** filesystem is mounted path

**Kind:** boolean value

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_filesystems_filesystem_is_mounted(/* path */)
```

## Runtime prototype

```c
bool blockos_ext_filesystems_filesystem_is_mounted(const char *);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_filesystems_filesystem_is_mounted(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
