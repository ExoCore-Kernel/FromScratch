<!-- auto-generated -->
# osx_filesystems_remove_file

**Type:** `osx_filesystems_remove_file`

**Display label:** remove file path

**Kind:** statement (command)

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1

## Generated C call

```c
blockos_ext_filesystems_remove_file(/* path */);
```

## Runtime prototype

```c
void blockos_ext_filesystems_remove_file(const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_filesystems_remove_file(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
