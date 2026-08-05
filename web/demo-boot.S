.section .text
.code16
.global _start
_start:
    cli
    xorw %ax, %ax
    movw %ax, %ds
    movw %ax, %ss
    movw $0x7c00, %sp
    sti

    movw $0x0013, %ax
    int $0x10

    movw $0xa000, %ax
    movw %ax, %es
    xorw %di, %di
    xorw %dx, %dx
row_loop:
    xorw %cx, %cx
col_loop:
    movb %cl, %al
    shrb $3, %al
    addb %dl, %al
    shrb $2, %al
    addb $1, %al
    stosb
    incw %cx
    cmpw $320, %cx
    jb col_loop
    incw %dx
    cmpw $200, %dx
    jb row_loop

    /* dark title bar */
    movw $0xa000, %ax
    movw %ax, %es
    xorw %di, %di
    movw $3200, %cx
    movb $1, %al
    rep stosb

    /* white-ish window */
    movw $0xa000, %ax
    movw %ax, %es
    movw $12880, %di
    movw $95, %dx
window_rows:
    movw $240, %cx
    movb $15, %al
    rep stosb
    addw $80, %di
    decw %dx
    jnz window_rows

    /* blue inner panel */
    movw $0xa000, %ax
    movw %ax, %es
    movw $16120, %di
    movw $58, %dx
panel_rows:
    movw $160, %cx
    movb $9, %al
    rep stosb
    addw $160, %di
    decw %dx
    jnz panel_rows

    /* switch back to text temporarily for readable message */
    movw $0x0003, %ax
    int $0x10
    movw $message, %si
print_loop:
    lodsb
    testb %al, %al
    jz wait_loop
    movb $0x0e, %ah
    movw $0x000f, %bx
    int $0x10
    jmp print_loop
wait_loop:
    xorb %ah, %ah
    int $0x16
    cmpb $'g', %al
    je graphics_again
    cmpb $'G', %al
    je graphics_again
    cmpb $'r', %al
    je reboot
    cmpb $'R', %al
    je reboot
    jmp wait_loop
graphics_again:
    movw $0x0013, %ax
    int $0x10
    jmp _start
reboot:
    ljmp $0xffff, $0x0000

message:
    .asciz "FromScratch Web VM\r\n\r\nThis page is running a real x86 boot image entirely in your browser.\r\nThe editor and Learning Center are static and need no backend.\r\n\r\nPress G to redraw the graphics demo or R to reboot.\r\n"

.org 510
.word 0xaa55
