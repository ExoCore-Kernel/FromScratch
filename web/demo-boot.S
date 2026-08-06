.code16
.global _start
_start:
 cli
 xor %ax,%ax
 mov %ax,%ds
 mov %ax,%es
 mov %ax,%ss
 mov $0x7c00,%sp
 sti
 mov $message,%si
1: lodsb
 test %al,%al
 jz 2f
 mov $0x0e,%ah
 mov $0x0007,%bx
 int $0x10
 jmp 1b
2: hlt
 jmp 2b
message: .asciz "FromScratch browser VM is running!\r\nChoose an ISO/IMG to boot your own OS.\r\n"
.org 510
.word 0xaa55
