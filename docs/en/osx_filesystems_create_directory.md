<!-- auto-generated -->
# osx_filesystems_create_directory

**Type:** `osx_filesystems_create_directory`

**Display label:** create directory path

**Kind:** statement (command)

**Category:** Filesystems

## Arguments

- **path** (string) — input slot 1

## Generated C call

```c
blockos_ext_filesystems_create_directory(/* path */);
```

## Runtime prototype

```c
void blockos_ext_filesystems_create_directory(const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_filesystems_create_directory(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
