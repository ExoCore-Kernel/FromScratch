import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({base:'/FromScratch/',build:{rollupOptions:{input:{studio:resolve(import.meta.dirname,'index.html'),learn:resolve(import.meta.dirname,'learn.html'),qemu64:resolve(import.meta.dirname,'qemu64.html')}}}});
