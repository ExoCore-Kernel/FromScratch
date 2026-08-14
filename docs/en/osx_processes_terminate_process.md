<!-- auto-generated -->
# osx_processes_terminate_process

**Type:** `osx_processes_terminate_process`

**Display label:** terminate process process id exit code

**Kind:** statement (command)

**Category:** Processes

## Arguments

- **process id** (number) — input slot 1
- **exit code** (number) — input slot 2

## Generated C call

```c
blockos_ext_processes_terminate_process(/* process id */, /* exit code */);
```

## Runtime prototype

```c
void blockos_ext_processes_terminate_process(uint64_t, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    blockos_ext_processes_terminate_process(0, 0);
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
