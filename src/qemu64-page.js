import {startQemu64, stopQemu64} from './browser-qemu64.js';

const imageInput = document.querySelector('#imageInput');
const memorySelect = document.querySelector('#memorySelect');
const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');
const terminal = document.querySelector('#terminal');
const status = document.querySelector('#status');

function setStatus(message, isError = false) {
  status.textContent = message;
  status.dataset.error = isError ? 'true' : 'false';
}

startButton.addEventListener('click', async () => {
  const file = imageInput.files?.[0];
  startButton.disabled = true;
  try {
    await startQemu64({
      file,
      terminal,
      memoryMb: Number(memorySelect.value),
      onStatus: setStatus,
    });
  } catch (error) {
    console.error(error);
    setStatus(error instanceof Error ? error.message : String(error), true);
  } finally {
    startButton.disabled = false;
  }
});

stopButton.addEventListener('click', async () => {
  await stopQemu64();
  terminal.replaceChildren();
  setStatus('Virtual machine stopped.');
});

window.addEventListener('beforeunload', () => {
  stopQemu64();
});
