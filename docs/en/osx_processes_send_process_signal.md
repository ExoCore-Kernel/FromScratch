<!-- auto-generated -->
# osx_processes_send_process_signal

**Type:** `osx_processes_send_process_signal`

**Display label:** send process signal process id signal

**Kind:** statement (command)

**Category:** Processes

## Arguments

- **process id** (number) — input slot 1
- **signal** (number) — input slot 2

## Generated C call

```c
blockos_ext_processes_send_process_signal(/* process id */, /* signal */);
```

## Runtime prototype

```c
void blockos_ext_processes_send_process_signal(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_processes_send_process_signal(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
