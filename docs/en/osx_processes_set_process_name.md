<!-- auto-generated -->
# osx_processes_set_process_name

**Type:** `osx_processes_set_process_name`

**Display label:** set process name process id name

**Kind:** statement (command)

**Category:** Processes

## Arguments

- **process id** (number) — input slot 1
- **name** (string) — input slot 2

## Generated C call

```c
blockos_ext_processes_set_process_name(/* process id */, /* name */);
```

## Runtime prototype

```c
void blockos_ext_processes_set_process_name(uint64_t, const char *);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_processes_set_process_name(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
