<!-- auto-generated -->
# osx_filesystems_close_file

**Type:** `osx_filesystems_close_file`

**Display label:** close file handle

**Kind:** statement (command)

**Category:** Filesystems

## Arguments

- **handle** (number) — input slot 1

## Generated C call

```c
blockos_ext_filesystems_close_file(/* handle */);
```

## Runtime prototype

```c
void blockos_ext_filesystems_close_file(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_filesystems_close_file(0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
