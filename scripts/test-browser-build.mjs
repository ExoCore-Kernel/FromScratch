import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir, readFile, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {setTimeout as sleep} from 'node:timers/promises';
import puppeteer from 'puppeteer-core';

const url = 'http://127.0.0.1:4173/FromScratch/';
const outputDirectory = fileURLToPath(new URL('../build/browser-smoke/', import.meta.url));
// Only a static preview server is running. No application backend exists.
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1',
  '--port', '4173', '--strictPort'], {stdio: 'inherit'});
let browser;
try {
  let live = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { live = (await fetch(url)).ok; } catch {}
    if (live) break;
    await sleep(1000);
  }
  if (!live) throw new Error('Vite preview server did not start.');
  browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const errors = [], backendRequests = [];
  async function openProject(project) {
    const page = await browser.newPage();
    await page.setViewport({width: 1600, height: 1100});
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if (new URL(request.url()).pathname.startsWith('/api/') || request.method() !== 'GET') backendRequests.push(request.url());
    });
    if (project) await page.evaluateOnNewDocument(project => {
      localStorage.setItem('blockos-studio-workspace-v1', JSON.stringify(project.workspace));
      localStorage.setItem('blockos-custom-block-specs-v1', JSON.stringify(project.customBlocks || []));
      localStorage.setItem('fromscratch-linux-assets-v1', JSON.stringify(project.files || []));
    }, project);
    await page.goto(url, {waitUntil: 'networkidle2', timeout: 90000});
    return page;
  }
  async function runUntil(page, text) {
    await page.waitForSelector('#buildRunButton', {timeout: 60000});
    await page.click('#buildRunButton');
    try {
      await page.waitForFunction(expected => {
        const output = document.querySelector('#runOutput')?.textContent ?? '';
        return output.includes(expected) || document.querySelector('#runStatus')?.textContent === 'Build or boot failed';
      }, {polling: 1000, timeout: 240000}, text);
      const log = await page.$eval('#runOutput', node => node.textContent);
      assert.ok(log.includes(text), log);
      assert.match(log, /\[FromScratch Linux x86_64\] boot successful/);
      assert.match(log, /\[Linux\] framebuffer mapped/);
    } catch (error) {
      console.error(await page.$eval('#runOutput', node => node.textContent).catch(() => 'Page closed.'));
      throw error;
    }
  }
  let page = await openProject();
  await runUntil(page, 'Hello from BlockOS!');
  await mkdir(outputDirectory, {recursive: true});
  await page.screenshot({path: `${outputDirectory}/linux-studio.png`});
  console.log('PASS: starter compiled in a worker and ran on Linux with a framebuffer.');

  const isoPath = `${outputDirectory}/FromScratch-Linux-x86_64.iso`;
  await rm(isoPath, {force: true});
  const session = await page.createCDPSession();
  await session.send('Browser.setDownloadBehavior', {behavior: 'allow', downloadPath: outputDirectory});
  await page.$eval('#exportBuiltIsoButton', node => node.click());
  await page.waitForFunction(() => document.querySelector('#statusText')?.textContent.includes('Exported FromScratch-Linux'), {timeout: 60000});
  let iso;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { iso = await readFile(isoPath); break; } catch {}
    await sleep(100);
  }
  assert.ok(iso?.length > 16 * 1024 * 1024, 'Browser ISO must download.');
  assert.equal(iso.toString('ascii', 32769, 32774), 'CD001');
  console.log('PASS: Export ISO produced a Linux boot image entirely in the browser.');
  await page.close();

  const project = JSON.parse(await readFile(new URL('../public/examples/simple-shell.blockos-project.json', import.meta.url), 'utf8'));
  const start = project.workspace.blocks.blocks.find(block => block.type === 'os_start');
  start.inputs.BODY.block = {type: 'os_print_asset_text', inputs: {INDEX: {shadow: {type: 'os_number', fields: {VALUE: 0}}}}, next: {block: start.inputs.BODY.block}};
  project.files = [{name: 'browser.txt', dataBase64: Buffer.from('browser asset').toString('base64')}];
  page = await openProject(project);
  assert.match(await page.$eval('#codeOutput', node => node.textContent), /Type h for help\./);
  await runUntil(page, 'Type h for help.');
  assert.match(await page.$eval('#runOutput', node => node.textContent), /browser asset/);
  await page.type('#runInput', 'h');
  await page.click('#sendInputButton');
  await page.waitForFunction(() => (document.querySelector('#runOutput')?.textContent || '').includes('Available commands:'), {polling: 1000, timeout: 30000});
  console.log('PASS: imported shell, attached initramfs file and Linux tty command.');
  await page.close();

  page = await openProject({workspace: {blocks: {languageVersion: 0, blocks: [
    {type: 'os_start'},
    {type: 'os_when_timer_tick', inputs: {
      INTERVAL: {shadow: {type: 'os_number', fields: {VALUE: 30}}},
      BODY: {block: {type: 'os_print_text', inputs: {TEXT: {shadow: {type: 'os_text', fields: {TEXT: 'Linux timer fired'}}}}, next: {block: {type: 'os_halt'}}}},
    }},
  ]}}});
  await runUntil(page, 'Linux timer fired');
  console.log('PASS: Linux monotonic timer event compiled and ran in the browser.');
  assert.deepEqual(backendRequests, [], 'Build and boot must use static GET requests only.');
  assert.deepEqual(errors, [], 'Browser must not emit uncaught errors.');
  console.log('PASS: browser Build and Run needs no backend.');
} finally {
  await browser?.close().catch(() => {});
  server.kill('SIGTERM');
}
