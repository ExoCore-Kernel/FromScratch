# Complete FromScratch v0.9 source archive

The earlier file-by-file upload was incomplete. The repository now contains a verified complete source snapshot in twelve numbered Base64 chunks:

```text
.source-bootstrap/part00
.source-bootstrap/part01
...
.source-bootstrap/part11
```

The reconstructed `tar.gz` must have this SHA-256 checksum:

```text
6d2b709ec3a7fad9a99a073c16c7f55cfde6cb7a433a57658decc8d114e796ab
```

## Restore automatically

After cloning the repository, run:

```bash
chmod +x RESTORE_SOURCE.sh
./RESTORE_SOURCE.sh
```

The script checks that all twelve chunks exist, decodes them, verifies the checksum, and replaces the partial working tree with the complete source.

Then run:

```bash
npm install
npm run check
npm run dev
```

## Restore manually

```bash
cat .source-bootstrap/part{00..11} | base64 -d > fromscratch-complete-v0.9.tar.gz
echo "6d2b709ec3a7fad9a99a073c16c7f55cfde6cb7a433a57658decc8d114e796ab  fromscratch-complete-v0.9.tar.gz" | sha256sum -c -
tar -xzf fromscratch-complete-v0.9.tar.gz
```

The archive contains the Blockly editor, all built-in blocks, C generator, typed custom blocks, Learning Center, kernel runtime, examples, browser compiler integration, v86 runner, x86_64 QEMU-Wasm laboratory, build scripts, and GitHub Pages workflow.
