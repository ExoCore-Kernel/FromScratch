import {spawn} from 'node:child_process';
import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {extensionBlocks} from '../src/blocks/block-catalog.js';
import {buildKernelImage} from './build-os.mjs';

const types = {cmd: 'void', num: 'uint64_t', bool: 'bool', text: 'const char *'};
const declarations = extensionBlocks.map(block => `${types[block.kind]} ${block.cName}(${block.args.map((arg, i) => `${arg.type === 'String' ? 'const char *' : arg.type === 'Boolean' ? 'bool' : 'uint64_t'} arg${i}`).join(', ') || 'void'});`).join('\n');
const source = `#include "linux.h"
${declarations}
void screen_print_line(const char *text);
uint32_t blockos_asset_count(void);
const char *blockos_asset_name(uint32_t index);
uint64_t blockos_asset_size(uint32_t index);
bool blockos_framebuffer_available(void);
bool blockos_string_equal_ignore_case(const char *a, const char *b);
bool blockos_console_line_available(void);
const char *blockos_console_read_line(void);
static void check(bool condition, const char *message) {
    if (!condition) { screen_print_line(message); LINUX1(60, 1); }
}
static uint64_t fork_state;
static void child_program(void) { fork_state = 99; LINUX1(60, 17); }
void blockos_main(void) {
    check(blockos_framebuffer_available(), "FAIL framebuffer");
    check(blockos_asset_count() == 2, "FAIL asset count");
    check(blockos_asset_size(0) == 5 && blockos_asset_size(1) == 0, "FAIL asset sizes");
    check(blockos_string_equal_ignore_case(blockos_asset_name(0), "hello.bin"), "FAIL asset name");
    uint64_t address = blockos_ext_kernel_heap_allocate_zeroed_items(6000, 1);
    uint8_t *buffer = (uint8_t *)(uintptr_t)address;
    check(address && buffer[5999] == 0, "FAIL mmap");
    for (int i=0;i<6000;++i) buffer[i] = (uint8_t)(i % 251);
    uint64_t fd = blockos_ext_filesystems_open_file("/tmp/test.bin", 2|64|512);
    check((int64_t)fd >= 0, "FAIL open");
    check(blockos_ext_filesystems_write_file_bytes(fd, address, 6000) == 6000, "FAIL write");
    check(blockos_ext_filesystems_seek_file(fd, 0, 0) == 0, "FAIL seek");
    for (int i=0;i<6000;++i) buffer[i]=0;
    check(blockos_ext_filesystems_read_file_bytes(fd, address, 6000)==6000 && buffer[5999]==5999%251, "FAIL read");
    blockos_ext_filesystems_close_file(fd);
    check(blockos_ext_filesystems_get_file_size("/tmp/test.bin")==6000, "FAIL file size");
    check(blockos_ext_filesystems_get_directory_entry_count("/tmp")==1, "FAIL directory");
    check(blockos_string_equal_ignore_case(blockos_ext_filesystems_get_directory_entry_name("/tmp",0),"test.bin"), "FAIL entry name");
    address=blockos_ext_kernel_heap_resize_heap_allocation(address,8000);
    check(address && ((uint8_t *)(uintptr_t)address)[5999]==5999%251, "FAIL resize");
    blockos_ext_kernel_heap_free_heap_allocation(address);
    check(blockos_ext_kernel_heap_get_heap_bytes_used()==0, "FAIL munmap");
    check((int64_t)blockos_ext_filesystems_open_file("/does-not-exist",0)==-2, "FAIL negative errno");
    check(blockos_ext_debug_and_information_get_last_error_code()==2, "FAIL last error");
    blockos_ext_debug_and_information_clear_last_error();
    uint64_t begin=blockos_ext_timers_and_clock_get_monotonic_nanoseconds();
    blockos_ext_timers_and_clock_sleep_milliseconds(20);
    check(blockos_ext_timers_and_clock_get_monotonic_nanoseconds()-begin>=20000000, "FAIL nanosleep");
    uint64_t pid=blockos_ext_processes_create_process("test-child",(uint64_t)(uintptr_t)child_program);
    check(pid>1 && pid!=blockos_ext_processes_get_current_process_id(), "FAIL fork");
    check(blockos_ext_processes_wait_for_process(pid)==17 && blockos_ext_processes_get_process_exit_code(pid)==17, "FAIL waitpid");
    check(fork_state == 0, "FAIL process isolation");
    check(blockos_ext_cpu_get_logical_processor_count()>=1, "FAIL CPU affinity");
    blockos_ext_networking_initialize_network_stack();
    uint64_t receiver=blockos_ext_networking_open_udp_socket(34567), sender=blockos_ext_networking_open_udp_socket(0);
    char payload[]="hello", received[8]={0};
    check((int64_t)receiver>=0 && (int64_t)sender>=0, "FAIL UDP open");
    check(blockos_ext_networking_send_udp_packet(sender,0x7f000001,34567,(uint64_t)(uintptr_t)payload,5)==5, "FAIL UDP send");
    blockos_ext_timers_and_clock_sleep_milliseconds(5);
    check(blockos_ext_networking_receive_udp_packet(receiver,(uint64_t)(uintptr_t)received,8)==5 && received[4]=='o', "FAIL UDP receive");
    blockos_ext_networking_close_network_socket(receiver);blockos_ext_networking_close_network_socket(sender);
    screen_print_line("READY input");
    while (!blockos_console_line_available()) linux_sleep_ms(1);
    check(blockos_string_equal_ignore_case(blockos_console_read_line(),"linux command"), "FAIL tty input");
    screen_print_line("PASS: Linux framebuffer, assets, files, memory, processes, timers, UDP and tty input");
}
`;
const build = new URL('../build/test-linux-runtime/', import.meta.url);
const {kernel, initrd} = await buildKernelImage({source, directory: fileURLToPath(build), createIso: false,
  assets: [{name: 'hello.bin', bytes: new Uint8Array([1, 0, 255, 2, 3])}, {name: 'empty', bytes: new Uint8Array()}]});
const output = await new Promise((resolve, reject) => {
  const child = spawn('qemu-system-x86_64', ['-accel','tcg','-cpu','qemu64','-m','256M','-vga','std','-kernel',kernel,'-initrd',initrd,
    '-append','console=ttyS0,115200 rdinit=/init quiet loglevel=3 nokaslr mitigations=off',
    '-display','none','-serial','stdio','-monitor','none','-no-reboot','-nic','none']);
  let output='', errors='', sent=false;
  const timer=setTimeout(()=>child.kill('SIGTERM'),60000);
  child.stdout.on('data',chunk=>{
    output+=chunk;
    if(!sent&&output.includes('READY input')) {sent=true;child.stdin.write('linux command\n');}
    if(output.includes('UDP and tty input\n')||output.includes('FAIL '))child.kill('SIGTERM');
  });
  child.stderr.on('data',chunk=>{errors+=chunk;});
  child.on('error',error=>{clearTimeout(timer);reject(error);});
  child.on('exit',()=>{clearTimeout(timer);output.includes('UDP and tty input\n')?resolve(output):reject(new Error(output+'\n'+errors));});
});
await writeFile(new URL('serial.log',build),output);
console.log(output.replace(/\x1b\[[0-9;]*[A-Za-z]/g,''));
