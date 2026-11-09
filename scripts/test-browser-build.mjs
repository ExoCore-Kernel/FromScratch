import {spawn} from 'node:child_process';
import {setTimeout as sleep} from 'node:timers/promises';
import puppeteer from 'puppeteer-core';

const url = 'http://127.0.0.1:4173/FromScratch/';
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
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url, {waitUntil: 'networkidle2', timeout: 90000});
  await page.waitForSelector('#buildRunButton', {timeout: 60000});
  await page.click('#buildRunButton');
  await page.waitForFunction(() => {
    const status = document.querySelector('#statusText')?.textContent ?? '';
    const run = document.querySelector('#runStatus')?.textContent ?? '';
    return status.includes('Your OS was built and booted') || run === 'Build or boot failed';
  }, {polling: 1000, timeout: 240000});
  const result = await page.evaluate(() => ({
    status: document.querySelector('#statusText')?.textContent,
    runStatus: document.querySelector('#runStatus')?.textContent,
    log: document.querySelector('#runOutput')?.textContent?.slice(-12000),
  }));
  console.log(JSON.stringify({result, errors}, null, 2));
  if (!result.status?.includes('Your OS was built and booted')) {
    throw new Error('The browser did not successfully build and boot the starter OS.');
  }
  // The bootloader may display via VGA before it emits serial data. A successful
  // emulator-ready event and valid build are required; guest text is informative.
  console.log('FromScratch browser Build and Run smoke test passed.');
} finally {
  await browser?.close().catch(() => {});
  server.kill('SIGTERM');
}
