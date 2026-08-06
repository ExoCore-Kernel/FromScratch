#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARCHIVE="${TMPDIR:-/tmp}/fromscratch-complete-v0.9.tar.gz"
EXPECTED="6d2b709ec3a7fad9a99a073c16c7f55cfde6cb7a433a57658decc8d114e796ab"

cd "$ROOT"

for part in .source-bootstrap/part{00..11}; do
  test -f "$part" || { echo "Missing archive part: $part" >&2; exit 1; }
done

cat .source-bootstrap/part{00..11} | base64 -d > "$ARCHIVE"
echo "$EXPECTED  $ARCHIVE" | sha256sum -c -

echo "Verified complete FromScratch v0.9 archive."
echo "Replacing the partial working tree with the recovered source…"

find . -mindepth 1 -maxdepth 1 \
  ! -name .git \
  ! -name .source-bootstrap \
  -exec rm -rf {} +

tar -xzf "$ARCHIVE" -C .
rm -rf .source-bootstrap

echo
echo "Source restored successfully."
echo "Next commands:"
echo "  npm install"
echo "  npm run check"
echo "  npm run dev"
