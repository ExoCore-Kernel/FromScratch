import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
import './style.css';
import {registerOsBlocks} from './blocks/os-blocks.js';
import {cGenerator} from './generator/c-generator.js';
import {toolbox} from './toolbox.js';
import {installToolboxLearning, openLearningTopic} from './toolbox-learning.js';
import {bootBrowserVm, stopBrowserVm, sendBrowserSerial} from './browser-vm.js';
import {compileX86_64Assembly, browserCompilerSupported} from './browser-compiler.js';
import {
  createCustomBlockSpec,
  callType,
  createDefinitionInWorkspace,
  definitionType,
  customSpecSummary,
  installCustomFunctionToolbox,
  isCustomDefinitionBlock,
  loadCustomBlockSpecs,
  registerCustomBlockSpec,
  registerCustomBlockSpecs,
  removeSpecBlocksFromWorkspace,
  saveCustomBlockSpecs,
} from './custom-blocks.js';

Blockly.setLocale(En);
registerOsBlocks();
let customBlockSpecs = loadCustomBlockSpecs();
registerCustomBlockSpecs(customBlockSpecs);

const STORAGE_KEY = 'blockos-studio-workspace-v1';
const codeOutput = document.querySelector('#codeOutput');
const statusText = document.querySelector('#statusText');
const diagnosticsElement = document.querySelector('#diagnostics');
const runOutput = document.querySelector('#runOutput');
const runStatus = document.querySelector('#runStatus');
const runInput = document.querySelector('#runInput');
const buildRunButton = document.querySelector('#buildRunButton');
const runAgainButton = document.querySelector('#runAgainButton');
const stopRunButton = document.querySelector('#stopRunButton');
const sendInputButton = document.querySelector('#sendInputButton');
const qemuScreen = document.querySelector('#qemuScreen');
const assetsDialog = document.querySelector('#assetsDialog');
const assetFiles = document.querySelector('#assetFiles');
const assetStatus = document.querySelector('#assetStatus');
const assetList = document.querySelector('#assetList');
const exportIsoButton = document.querySelector('#exportIsoButton');
const compileButton = document.querySelector('#compileButton');
const bootImageInput = document.querySelector('#bootImageInput');
const chooseBootImageButton = document.querySelector('#chooseBootImageButton');
const projectFileDialog = document.querySelector('#projectFileDialog');
const importProjectInput = document.querySelector('#importProjectInput');
const customBlocksDialog = document.querySelector('#customBlocksDialog');
const customBlockForm = document.querySelector('#customBlockForm');
const customBlockName = document.querySelector('#customBlockName');
const customArgumentRows = document.querySelector('#customArgumentRows');
const customBlockList = document.querySelector('#customBlockList');
const inspectorTabs = [...document.querySelectorAll('[data-inspector]')];
const inspectorViews = {code: document.querySelector('#codeView'), run: document.querySelector('#runView')};
const mobileButtons = [...document.querySelectorAll('[data-mobile-target]')];

let selectedBootImage = null;
let browserAssets = [];

const blockOsTheme = Blockly.Theme.defineTheme('blockOsTheme', {
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: '#f5f7fb',
    toolboxBackgroundColour: '#111827',
    toolboxForegroundColour: '#e5e7eb',
    flyoutBackgroundColour: '#1f2937',
    flyoutForegroundColour: '#f9fafb',
    flyoutOpacity: 0.98,
    scrollbarColour: '#64748b',
    insertionMarkerColour: '#2563eb',
    insertionMarkerOpacity: 0.45,
    cursorColour: '#2563eb',
  },
});

const workspace = Blockly.inject('blocklyDiv', {
  toolbox,
  theme: blockOsTheme,
  renderer: 'zelos',
  trashcan: true,
  sounds: true,
  media: './media/',
  move: {scrollbars: true, drag: true, wheel: true},
  zoom: {controls: true, wheel: true, startScale: 0.88, maxScale: 1.6, minScale: 0.35, scaleSpeed: 1.12},
  grid: {spacing: 24, length: 3, colour: '#d4dbea', snap: true},
});

installCustomFunctionToolbox(workspace, () => customBlockSpecs, openCustomBlocksDialog);
installToolboxLearning(workspace);

function createBlock(type, x, y) {
  const block = workspace.newBlock(type);
  block.initSvg();
  block.render();
  block.moveBy(x, y);
  return block;
}

function connectValue(parent, inputName, child) {
  parent.getInput(inputName)?.connection?.connect(child.outputConnection);
}

function connectStatement(parent, inputName, child) {
  parent.getInput(inputName)?.connection?.connect(child.previousConnection);
}

function connectNext(first, second) {
  first.nextConnection?.connect(second.previousConnection);
}

function loadStarterProject() {
  workspace.clear();
  Blockly.Events.disable();
  try {
    const start = createBlock('os_start', 42, 42);
    const clear = createBlock('os_clear_screen', 90, 130);
    const black = createBlock('os_colour', 390, 150);
    black.setFieldValue('#111827', 'COLOUR');
    connectValue(clear, 'COLOUR', black);

    const print = createBlock('os_print_text', 90, 230);
    const text = createBlock('os_text', 330, 250);
    text.setFieldValue('Hello from BlockOS!', 'TEXT');
    connectValue(print, 'TEXT', text);

    const forever = createBlock('os_forever', 90, 330);
    const wait = createBlock('os_wait_interrupt', 150, 415);

    connectStatement(start, 'BODY', clear);
    connectNext(clear, print);
    connectNext(print, forever);
    connectStatement(forever, 'BODY', wait);
  } finally {
    Blockly.Events.enable();
  }
  workspace.cleanUp();
  updateCode();
}

function findDiagnostics() {
  const messages = [];
  const allBlocks = workspace.getAllBlocks(false);
  const topBlocks = workspace.getTopBlocks(true);
  const startBlocks = allBlocks.filter((block) => block.type === 'os_start');

  if (startBlocks.length === 0) messages.push('Add one “when kernel starts” block so the program has an entry point.');
  if (startBlocks.length > 1) messages.push('Only one “when kernel starts” block is allowed.');

  for (const block of topBlocks) {
    if (block.type !== 'os_start' && block.type !== 'os_function_def' && !isCustomDefinitionBlock(block)) {
      messages.push(`The top-level “${block.type}” block must be connected inside the kernel.`);
    }
  }
for (const spec of customBlockSpecs) {
  const definitionCount = allBlocks.filter((block) => block.type === definitionType(spec)).length;
  const callCount = allBlocks.filter((block) => block.type === callType(spec)).length;
  if (definitionCount > 1) messages.push(`Custom block “${spec.displayName}” has more than one definition.`);
  if (callCount > 0 && definitionCount === 0) messages.push(`Custom block “${spec.displayName}” is used but its definition block is missing.`);
}
  return [...new Set(messages)];
}

function renderDiagnostics(messages) {
  if (messages.length === 0) {
    diagnosticsElement.classList.remove('visible');
    diagnosticsElement.replaceChildren();
    statusText.textContent = 'Generated successfully';
    return;
  }
  const list = document.createElement('ul');
  for (const message of messages) {
    const item = document.createElement('li');
    item.textContent = message;
    list.append(item);
  }
  diagnosticsElement.replaceChildren(list);
  diagnosticsElement.classList.add('visible');
  statusText.textContent = `${messages.length} warning${messages.length === 1 ? '' : 's'}`;
}

function updateCode() {
  try {
    codeOutput.textContent = cGenerator.workspaceToCode(workspace);
    renderDiagnostics(findDiagnostics());
  } catch (error) {
    console.error(error);
    codeOutput.textContent = `// Generator error:\n// ${error instanceof Error ? error.message : String(error)}`;
    renderDiagnostics(['The generator hit an error. Check the browser developer console.']);
  }
}

let updateTimer;
workspace.addChangeListener((event) => {
  if (event.isUiEvent) return;
  window.clearTimeout(updateTimer);
  updateTimer = window.setTimeout(() => {
    updateCode();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Blockly.serialization.workspaces.save(workspace)));
  }, 80);
});

function saveProject() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Blockly.serialization.workspaces.save(workspace)));
  statusText.textContent = 'Saved in this browser';
}

function loadProject() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    statusText.textContent = 'No saved project found';
    return;
  }
  try {
    workspace.clear();
    Blockly.serialization.workspaces.load(JSON.parse(saved), workspace);
    updateCode();
    statusText.textContent = 'Loaded saved project';
  } catch (error) {
    console.error(error);
    statusText.textContent = 'Saved project could not be loaded';
  }
}

function safeProjectFileName(value) {
  const cleaned = String(value ?? 'blockos-project')
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return cleaned || 'blockos-project';
}

function downloadJsonFile(fileName, value) {
  const blob = new Blob([`${JSON.stringify(value, null, 2)}\n`], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportProjectFile() {
  const suggestedName = window.prompt('Project name', 'my-blockos-project');
  if (suggestedName === null) return;

  const name = String(suggestedName).trim() || 'My BlockOS Project';
  const project = {
    format: 'blockos-project',
    formatVersion: 1,
    name,
    target: 'x86_64',
    exportedAt: new Date().toISOString(),
    customBlocks: customBlockSpecs,
    workspace: Blockly.serialization.workspaces.save(workspace),
  };

  downloadJsonFile(`${safeProjectFileName(name)}.blockos-project.json`, project);
  statusText.textContent = 'Project file exported';
}

async function applyImportedProject(parsed, displayName) {
  const isProjectPackage = parsed?.format === 'blockos-project';
  const workspaceState = isProjectPackage ? parsed.workspace : parsed.workspace ?? parsed;

  if (!workspaceState || typeof workspaceState !== 'object' || !workspaceState.blocks) {
    throw new Error('This file does not contain a Blockly workspace.');
  }

  const importedSpecs = isProjectPackage && Array.isArray(parsed.customBlocks)
    ? parsed.customBlocks
    : customBlockSpecs;

  saveCustomBlockSpecs(importedSpecs);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaceState));
  statusText.textContent = `Imported ${parsed.name || displayName}`;
  window.setTimeout(() => window.location.reload(), 80);
}

async function importProjectFile(file) {
  if (!file) return;
  if (workspace.getAllBlocks(false).length > 0
      && !window.confirm('Replace the current project with the imported project?')) {
    importProjectInput.value = '';
    return;
  }

  try {
    await applyImportedProject(JSON.parse(await file.text()), file.name);
  } catch (error) {
    console.error(error);
    statusText.textContent = `Project import failed: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    importProjectInput.value = '';
  }
}

async function loadShellExample() {
  if (workspace.getAllBlocks(false).length > 0
      && !window.confirm('Replace the current project with the word-command shell example?')) {
    return;
  }

  try {
    const response = await fetch(new URL('examples/word-command-shell.blockos-project.json', document.baseURI), {cache: 'no-store'});
    if (!response.ok) throw new Error(`Server returned HTTP ${response.status}.`);
    await applyImportedProject(await response.json(), 'word-command shell example');
  } catch (error) {
    console.error(error);
    statusText.textContent = `Could not load shell example: ${error instanceof Error ? error.message : String(error)}`;
  }
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(codeOutput.textContent ?? '');
    statusText.textContent = 'Code copied';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(codeOutput);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    statusText.textContent = 'Select Copy from your browser';
  }
}

function downloadCode() {
  const blob = new Blob([codeOutput.textContent ?? ''], {type: 'text/x-c'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'blockos_kernel.c';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  statusText.textContent = 'Exported blockos_kernel.c';
}

function selectInspector(name) {
  for (const tab of inspectorTabs) tab.classList.toggle('active', tab.dataset.inspector === name);
  for (const [viewName, view] of Object.entries(inspectorViews)) view.classList.toggle('active', viewName === name);
}

function selectMobilePanel(name) {
  document.body.dataset.mobilePanel = name;
  for (const button of mobileButtons) button.classList.toggle('active', button.dataset.mobileTarget === name);
  if (name === 'code' || name === 'run') selectInspector(name);
  window.setTimeout(() => Blockly.svgResize(workspace), 30);
}

function setRunControls(running) {
  stopRunButton.disabled = !running;
  sendInputButton.disabled = !running;
  runInput.disabled = !running;
  runAgainButton.disabled = false;
  buildRunButton.disabled = false;
  buildRunButton.textContent = '▶ Run Web Demo';
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
}

function bytesToBase64(bytes) {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  return btoa(binary);
}

function renderAssets() {
  assetList.replaceChildren();
  if (!browserAssets.length) { assetStatus.textContent = 'No local project files attached.'; return; }
  assetStatus.textContent = `${browserAssets.length} local file${browserAssets.length === 1 ? '' : 's'} attached.`;
  browserAssets.forEach((asset, index) => {
    const row = document.createElement('div'); row.className = 'asset-row';
    const details = document.createElement('span'); details.textContent = `${asset.name} · ${formatBytes(asset.bytes.byteLength)}`;
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'button button-secondary'; remove.textContent = 'Remove';
    remove.addEventListener('click', () => { browserAssets.splice(index, 1); renderAssets(); });
    row.append(details, remove); assetList.append(row);
  });
}

async function uploadAssets() {
  const files = [...(assetFiles.files ?? [])];
  if (!files.length) { assetStatus.textContent = 'Choose one or more files first.'; return; }
  for (const file of files) browserAssets.push({name: file.name, type: file.type, bytes: new Uint8Array(await file.arrayBuffer())});
  assetFiles.value = ''; renderAssets();
}

function downloadBlob(name, blob) {
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = name;
  document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}

async function exportBuildBundle() {
  exportIsoButton.disabled = true;
  try {
    const bundle = {format:'fromscratch-build-bundle',formatVersion:1,target:'x86_64-elf',generatedAt:new Date().toISOString(),generatedC:codeOutput.textContent ?? '',project:Blockly.serialization.workspaces.save(workspace),customBlocks:customBlockSpecs,files:browserAssets.map(a=>({name:a.name,type:a.type,dataBase64:bytesToBase64(a.bytes)})),buildInstructions:'Use the local/Pi toolchain or scripts/build-browser-kernel-runtime.sh to package a bootable image.'};
    downloadBlob('fromscratch-build-bundle.json', new Blob([`${JSON.stringify(bundle, null, 2)}\n`], {type:'application/json'}));
    statusText.textContent = 'Exported complete build bundle';
  } finally { exportIsoButton.disabled = false; }
}

async function compileInBrowser() {
  compileButton.disabled = true; selectInspector('run'); runStatus.textContent = 'Loading WebAssembly Clang…'; runOutput.textContent = '';
  try {
    if (!browserCompilerSupported()) throw new Error('This browser cannot run the WebAssembly compiler.');
    const result = await compileX86_64Assembly(codeOutput.textContent ?? '', {onLog(text){runOutput.textContent += text;}});
    downloadBlob('blockos_kernel_x86_64.S', new Blob([result.assembly], {type:'text/x-asm'}));
    runStatus.textContent = `Compiled x86_64 assembly · ${formatBytes(result.assembly.length)}`; statusText.textContent = 'Browser compilation succeeded';
  } catch (error) { runStatus.textContent = 'Browser compilation failed'; runOutput.textContent += `\n${error instanceof Error ? error.message : String(error)}`; }
  finally { compileButton.disabled = false; }
}

async function startBrowserRun() {
  buildRunButton.disabled = true; runAgainButton.disabled = true; selectInspector('run');
  if (window.matchMedia('(max-width: 1180px)').matches) selectMobilePanel('run');
  try {
    await bootBrowserVm({...(selectedBootImage ? {file:selectedBootImage} : {demoUrl:'web-demo.img'}),screenContainer:qemuScreen,onStatus(message){runStatus.textContent=message;},onSerial(text){runOutput.textContent=text || '[No serial output yet.]';}});
    setRunControls(true); runInput.focus();
  } catch (error) { runStatus.textContent='Web VM could not start'; runOutput.textContent=error instanceof Error?error.message:String(error); setRunControls(false); }
}

async function stopCurrentRun() {
  await stopBrowserVm(); qemuScreen.innerHTML='<div class="screen-placeholder">Web VM stopped.</div>'; runStatus.textContent='Web VM stopped'; setRunControls(false);
}

function sendRunInput() {
  const value=runInput.value; if(!value)return;
  try { sendBrowserSerial(`${value}\n`); runInput.value=''; } catch(error) { runStatus.textContent=error instanceof Error?error.message:String(error); }
}

function addCustomArgumentRow(initial = {}) {
  if (customArgumentRows.children.length >= 8) {
    statusText.textContent = 'Custom blocks support up to 8 arguments';
    return;
  }
  const row = document.createElement('div');
  row.className = 'custom-argument-row';
  row.innerHTML = `
    <input class="custom-argument-name" type="text" maxlength="32" placeholder="argument name" value="${String(initial.name ?? '').replaceAll('&', '&amp;').replaceAll('"', '&quot;')}" required />
    <select class="custom-argument-type" aria-label="Argument type">
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="unsigned">Unsigned 64-bit</option>
      <option value="boolean">Boolean</option>
      <option value="colour">Colour</option>
      <option value="pointer">Pointer</option>
      <option value="custom">Custom type…</option>
    </select>
    <input class="custom-type-name" type="text" maxlength="32" placeholder="custom type name" hidden />
    <button type="button" class="button button-secondary custom-remove-argument">Remove</button>
  `;
  const select = row.querySelector('.custom-argument-type');
  const customName = row.querySelector('.custom-type-name');
  select.value = initial.typeKind ?? 'number';
  customName.value = initial.customTypeName ?? '';
  const updateCustomVisibility = () => {
    const visible = select.value === 'custom';
    customName.hidden = !visible;
    customName.required = visible;
  };
  select.addEventListener('change', updateCustomVisibility);
  row.querySelector('.custom-remove-argument').addEventListener('click', () => row.remove());
  updateCustomVisibility();
  customArgumentRows.append(row);
}

function readCustomArguments() {
  return [...customArgumentRows.querySelectorAll('.custom-argument-row')].map((row) => ({
    name: row.querySelector('.custom-argument-name').value,
    typeKind: row.querySelector('.custom-argument-type').value,
    customTypeName: row.querySelector('.custom-type-name').value,
  }));
}

function refreshCustomFunctionToolbox() {
  workspace.updateToolbox(toolbox);
  workspace.getToolbox()?.refreshSelection?.();
}

function renderCustomBlockList() {
  customBlockList.replaceChildren();
  if (!customBlockSpecs.length) {
    const empty = document.createElement('div');
    empty.className = 'notice';
    empty.textContent = 'No custom blocks yet.';
    customBlockList.append(empty);
    return;
  }

  for (const spec of customBlockSpecs) {
    const row = document.createElement('div');
    row.className = 'custom-block-row';
    const info = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = spec.displayName;
    const summary = document.createElement('span');
    summary.textContent = customSpecSummary(spec);
    info.append(title, summary);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'button button-secondary';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => {
      if (!window.confirm(`Delete the custom block “${spec.displayName}” and every copy of it from this project?`)) return;
      removeSpecBlocksFromWorkspace(workspace, spec);
      customBlockSpecs = customBlockSpecs.filter((item) => item.id !== spec.id);
      saveCustomBlockSpecs(customBlockSpecs);
      refreshCustomFunctionToolbox();
      renderCustomBlockList();
      updateCode();
    });
    row.append(info, remove);
    customBlockList.append(row);
  }
}

function openCustomBlocksDialog() {
  customBlockForm.reset();
  customArgumentRows.replaceChildren();
  renderCustomBlockList();
  customBlocksDialog.showModal();
  customBlockName.focus();
}

function createCustomBlockFromForm(event) {
  event.preventDefault();
  try {
    const spec = createCustomBlockSpec(customBlockName.value, readCustomArguments());
    if (customBlockSpecs.some((item) => item.displayName.toLowerCase() === spec.displayName.toLowerCase())) {
      throw new Error(`A custom block named “${spec.displayName}” already exists.`);
    }
    customBlockSpecs.push(spec);
    registerCustomBlockSpec(spec);
    saveCustomBlockSpecs(customBlockSpecs);
    refreshCustomFunctionToolbox();
    createDefinitionInWorkspace(workspace, spec);
    workspace.cleanUp();
    updateCode();
    customBlocksDialog.close();
    statusText.textContent = `Created custom block “${spec.displayName}”`;
  } catch (error) {
    statusText.textContent = error instanceof Error ? error.message : String(error);
  }
}

async function buildAndRun() { await startBrowserRun(); }

document.querySelector('#learnButton').addEventListener('click', () => openLearningTopic());
document.querySelector('#newButton').addEventListener('click', () => {
  if (workspace.getAllBlocks(false).length > 0 && !window.confirm('Replace the current project with the starter project?')) return;
  loadStarterProject();
});
document.querySelector('#saveButton').addEventListener('click', saveProject);
document.querySelector('#loadButton').addEventListener('click', loadProject);
document.querySelector('#projectFileButton').addEventListener('click', () => projectFileDialog.showModal());
document.querySelector('#closeProjectFileButton').addEventListener('click', () => projectFileDialog.close());
document.querySelector('#exportProjectFileButton').addEventListener('click', () => { projectFileDialog.close(); exportProjectFile(); });
document.querySelector('#importProjectFileButton').addEventListener('click', () => { projectFileDialog.close(); importProjectInput.click(); });
document.querySelector('#loadShellExampleButton').addEventListener('click', () => { projectFileDialog.close(); loadShellExample(); });
importProjectInput.addEventListener('change', () => importProjectFile(importProjectInput.files?.[0]));
document.querySelector('#customBlocksButton').addEventListener('click', openCustomBlocksDialog);
document.querySelector('#closeCustomBlocksButton').addEventListener('click', () => customBlocksDialog.close());
document.querySelector('#cancelCustomBlocksButton').addEventListener('click', () => customBlocksDialog.close());
document.querySelector('#addCustomArgumentButton').addEventListener('click', () => addCustomArgumentRow());
customBlockForm.addEventListener('submit', createCustomBlockFromForm);
document.querySelector('#copyButton').addEventListener('click', copyCode);
document.querySelector('#downloadButton').addEventListener('click', downloadCode);
document.querySelector('#assetsButton').addEventListener('click', () => { assetsDialog.showModal(); renderAssets(); });
document.querySelector('#closeAssetsButton').addEventListener('click', () => assetsDialog.close());
document.querySelector('#uploadAssetsButton').addEventListener('click', () => uploadAssets().catch((error) => { assetStatus.textContent = error.message; }));
exportIsoButton.addEventListener('click', exportBuildBundle);
compileButton.addEventListener('click', compileInBrowser);
chooseBootImageButton.addEventListener('click', () => bootImageInput.click());
bootImageInput.addEventListener('change', () => { selectedBootImage = bootImageInput.files?.[0] ?? null; if (selectedBootImage) { runStatus.textContent = `Selected ${selectedBootImage.name}`; startBrowserRun(); } });
buildRunButton.addEventListener('click', buildAndRun);
runAgainButton.addEventListener('click', buildAndRun);
stopRunButton.addEventListener('click', stopCurrentRun);
sendInputButton.addEventListener('click', sendRunInput);
runInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendRunInput();
  }
});
for (const tab of inspectorTabs) tab.addEventListener('click', () => selectInspector(tab.dataset.inspector));
for (const button of mobileButtons) button.addEventListener('click', () => selectMobilePanel(button.dataset.mobileTarget));

window.addEventListener('resize', () => Blockly.svgResize(workspace));
window.addEventListener('beforeunload', () => { stopBrowserVm(); });

const savedProject = localStorage.getItem(STORAGE_KEY);
if (savedProject) {
  try {
    Blockly.serialization.workspaces.load(JSON.parse(savedProject), workspace);
    updateCode();
  } catch {
    loadStarterProject();
  }
} else {
  loadStarterProject();
}
