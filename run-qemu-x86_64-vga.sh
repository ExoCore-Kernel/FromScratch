#!/usr/bin/env bash
set -euo pipefail

ISO_PATH=""
MEMORY="2G"
CPUS=2
DISPLAY_TYPE=""
FORCE_KVM=0

HOST_OS="$(uname -s)"
HOST_ARCH="$(uname -m)"

# ------------------------------------------------------------
# Defaults
# ------------------------------------------------------------

if [[ "$HOST_OS" == "Darwin" ]]; then
    DEFAULT_DISPLAY="cocoa"
    ACCELERATOR="hvf"
else
    DEFAULT_DISPLAY="gtk"
    ACCELERATOR="tcg"
fi

usage() {
cat <<EOF
Uso:
  $0 [path/to/image.iso] [options]

Opzioni:
  -m <memoria>   Quantità di memoria (default: ${MEMORY})
  -c <cpus>      Numero di CPU (default: ${CPUS})
  -d <display>   cocoa|gtk|sdl|none
                 (default: ${DEFAULT_DISPLAY})
                 Su macOS, 'gtk' viene automaticamente convertito in
                 'cocoa' perché il backend GTK non è disponibile in
                 questa build di QEMU.
                 Nota: se usi la VGA/GUI, la tastiera del guest arriva
                 tramite device USB/PS2 del VM; se vuoi input seriale da
                 terminale usa -display none -serial stdio.
  -k             Forza KVM (solo Linux)
  -h             Mostra questo aiuto

Esempi:
  $0
  $0 FromScratch-BlockOS-x86_64.iso
  $0 ubuntu.iso -m 4G -c 4
EOF
}

# ------------------------------------------------------------
# Parse ISO path
# ------------------------------------------------------------

if [[ $# -ge 1 && ! "$1" =~ ^- ]]; then
    ISO_PATH="$1"
    shift
fi

# ------------------------------------------------------------
# Parse options
# ------------------------------------------------------------

while getopts ":m:c:d:kh" opt; do
    case "$opt" in
        m)
            MEMORY="$OPTARG"
            ;;
        c)
            CPUS="$OPTARG"
            ;;
        d)
            DISPLAY_TYPE="$OPTARG"
            ;;
        k)
            FORCE_KVM=1
            ;;
        h)
            usage
            exit 0
            ;;
        :)
            echo "Opzione -$OPTARG richiede un argomento." >&2
            exit 1
            ;;
        \?)
            echo "Opzione sconosciuta: -$OPTARG" >&2
            usage
            exit 1
            ;;
    esac
done

if [[ -z "$DISPLAY_TYPE" ]]; then
    DISPLAY_TYPE="$DEFAULT_DISPLAY"
fi

# ------------------------------------------------------------
# Find ISO
# ------------------------------------------------------------

if [[ -z "$ISO_PATH" ]]; then
    found_iso=""

    while IFS= read -r -d '' file; do
        found_iso="$file"
        break
    done < <(find . -maxdepth 1 -type f -name '*.iso' -print0 2>/dev/null)

    if [[ -n "$found_iso" ]]; then
        ISO_PATH="$found_iso"
        echo "Nessun ISO specificato: uso $ISO_PATH"
    else
        echo "Nessun file .iso trovato nella directory corrente." >&2
        usage
        exit 1
    fi
fi

if [[ ! -f "$ISO_PATH" ]]; then
    echo "ISO non trovato: $ISO_PATH" >&2
    exit 2
fi

# ------------------------------------------------------------
# Find QEMU
# ------------------------------------------------------------

QEMU_BIN="$(command -v qemu-system-x86_64 || true)"

if [[ -z "$QEMU_BIN" ]]; then
    echo "qemu-system-x86_64 non trovato." >&2
    echo "Installa QEMU con:" >&2
    echo "  brew install qemu" >&2
    exit 3
fi

# ------------------------------------------------------------
# Build command
# ------------------------------------------------------------

CMD=("$QEMU_BIN")

# ------------------------------------------------------------
# Acceleration + CPU
# ------------------------------------------------------------

if [[ "$HOST_OS" == "Darwin" ]]; then

    # macOS Intel / Apple Silicon
    CMD+=(
        -accel hvf
    )

    if [[ "$HOST_ARCH" == "x86_64" ]]; then
        # Intel Mac:
        #
        # Do NOT use "-cpu host".
        # HVF + host CPU feature passthrough can expose
        # unsupported/irrelevant CPUID features to the guest.
        #
        # qemu64 provides a generic x86_64 CPU model and avoids
        # passing AMD SVM or other host-specific features.
        CMD+=(
            -cpu qemu64
        )

        echo "Host: macOS Intel (x86_64)"
        echo "Accelerator: HVF"
        echo "CPU model: qemu64"

    elif [[ "$HOST_ARCH" == "arm64" ]]; then

        # This script emulates an x86_64 guest on Apple Silicon.
        # HVF cannot provide native x86 CPU virtualization there,
        # so use TCG instead.
        CMD=("$QEMU_BIN")
        CMD+=(
            -accel tcg
            -cpu qemu64
        )

        echo "Host: macOS Apple Silicon (arm64)"
        echo "Accelerator: TCG"
        echo "CPU model: qemu64"

    fi

elif [[ "$FORCE_KVM" -eq 1 || -e /dev/kvm ]]; then

    if [[ -e /dev/kvm ]]; then
        CMD+=(
            -accel kvm
            -cpu host
        )

        echo "Host: Linux"
        echo "Accelerator: KVM"
        echo "CPU model: host"
    else
        echo "KVM richiesto ma /dev/kvm non è disponibile." >&2
        exit 4
    fi

else

    CMD+=(
        -accel tcg
        -cpu qemu64
        -cpu qemu64,-svm
    )

    echo "Host: Linux"
    echo "Accelerator: TCG"
    echo "CPU model: qemu64"

fi

# ------------------------------------------------------------
# VM configuration
# ------------------------------------------------------------

CMD+=(
    -m "$MEMORY"
    -smp "$CPUS"
    -machine pc
    -vga std
    -monitor none
    -serial stdio
    -cdrom "$ISO_PATH"
    -boot order=d
)

# ------------------------------------------------------------
# Network
# ------------------------------------------------------------

CMD+=(
    -netdev user,id=net0
    -device e1000,netdev=net0
)

# ------------------------------------------------------------
# USB / input
# ------------------------------------------------------------

CMD+=(
    -usb
    -device usb-tablet
    -device usb-kbd
)

# ------------------------------------------------------------
# Display
# ------------------------------------------------------------

case "$DISPLAY_TYPE" in
    cocoa)
        CMD+=(-display cocoa)
        ;;
    gtk)
        if [[ "$HOST_OS" == "Darwin" ]]; then
            echo "Display 'gtk' non supportato su macOS: uso 'cocoa' invece." >&2
            CMD+=(-display cocoa)
        else
            CMD+=(-display gtk)
        fi
        ;;
    sdl)
        if [[ "$HOST_OS" == "Darwin" ]]; then
            echo "Display 'sdl' non supportato su macOS: uso 'cocoa' invece." >&2
            CMD+=(-display cocoa)
        else
            CMD+=(-display sdl)
        fi
        ;;
    none)
        CMD+=(-nographic)
        ;;
    *)
        echo "Display non valido: $DISPLAY_TYPE" >&2
        echo "Valori ammessi: cocoa | gtk | sdl | none" >&2
        exit 1
        ;;
esac

# ------------------------------------------------------------
# Execute
# ------------------------------------------------------------

echo
echo "Eseguo:"
printf ' %q' "${CMD[@]}"
echo
echo

exec "${CMD[@]}"