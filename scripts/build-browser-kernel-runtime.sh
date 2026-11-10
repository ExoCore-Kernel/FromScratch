#!/usr/bin/env bash
set -euo pipefail
# Compatibility entry point: browser builds boot Linux directly with an initramfs.
node scripts/setup-linux.mjs
