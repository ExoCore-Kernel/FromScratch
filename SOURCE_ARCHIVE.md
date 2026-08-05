# Complete FromScratch source archive

The repository contains the web edition source directly. A complete v0.9 snapshot is also being uploaded under `source/v0.9/` as numbered Base64 parts so it can be reconstructed exactly even while the direct file upload is being completed.

To reconstruct after all nine parts are present:

```bash
cat source/v0.9/fromscratch-v0.9.tar.gz.b64.part* | base64 -d > fromscratch-v0.9.tar.gz
mkdir fromscratch-v0.9
 tar -xzf fromscratch-v0.9.tar.gz -C fromscratch-v0.9
```

The archive includes the editor, learning centre, kernel runtime, browser compiler integration, x86_64 QEMU-Wasm runner, v86 runner, examples, scripts and GitHub Pages workflow.
