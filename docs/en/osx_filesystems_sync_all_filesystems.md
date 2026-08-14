<!-- auto-generated -->
# osx_filesystems_sync_all_filesystems

**Type:** `osx_filesystems_sync_all_filesystems`

**Display label:** sync all filesystems

**Kind:** statement (command)

**Category:** Filesystems

## Generated C call

```c
blockos_ext_filesystems_sync_all_filesystems();
```

## Runtime prototype

```c
void blockos_ext_filesystems_sync_all_filesystems(void);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_filesystems_sync_all_filesystems();
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
