import * as Blockly from 'blockly/core';
import {
  blockHelpUrl,
  categoryForBlock,
  categoryTooltip,
  learningCategoryMap,
  normalizeCategoryName,
} from './learning-content.js';

export function openLearningTopic(topic = '', blockType = '') {
  const url = new URL('./blocks-manual.html', window.location.href);
  if (topic) url.searchParams.set('topic', normalizeCategoryName(topic));
  if (blockType) url.searchParams.set('block', blockType);
  window.open(url.toString(), 'blockos-learning');
}

function decorateToolboxRows() {
  const rows = [...document.querySelectorAll('.blocklyToolboxDiv .blocklyTreeRow')];
  for (const row of rows) {
    const labelElement = row.querySelector('.blocklyTreeLabel');
    const categoryName = normalizeCategoryName(labelElement?.textContent);
    const category = learningCategoryMap.get(categoryName);
    if (!category) continue;

    row.dataset.blockosLearningTopic = categoryName;
    row.title = `${categoryTooltip(categoryName)} Select the ? button for the complete guide.`;

    if (row.querySelector('.blockos-category-help')) continue;
    const help = document.createElement('button');
    help.type = 'button';
    help.className = 'blockos-category-help';
    help.textContent = '?';
    help.title = `Open the ${categoryName} learning guide`;
    help.setAttribute('aria-label', `Learn how ${categoryName} blocks work`);
    help.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    help.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLearningTopic(categoryName);
    });
    row.append(help);
  }
}

function installBlockHelpLinks(workspace) {
  const apply = (block) => {
    const category = categoryForBlock(block.type);
    if (!category) return;
    block.setHelpUrl(blockHelpUrl(block.type));
    const existing = block.getTooltip();
    const groupText = categoryTooltip(category);
    if (typeof existing === 'string' && !existing.includes('Learning Center')) {
      block.setTooltip(`${existing}\n\nLearning Center: ${groupText}`);
    }
  };

  for (const block of workspace.getAllBlocks(false)) apply(block);

  workspace.addChangeListener((event) => {
    if (event.type !== Blockly.Events.BLOCK_CREATE) return;
    for (const id of event.ids ?? []) {
      const block = workspace.getBlockById(id);
      if (block) apply(block);
    }
  });
}

export function installToolboxLearning(workspace) {
  installBlockHelpLinks(workspace);

  const toolboxElement = document.querySelector('.blocklyToolboxDiv');
  if (!toolboxElement) {
    window.setTimeout(() => installToolboxLearning(workspace), 100);
    return;
  }

  decorateToolboxRows();
  const observer = new MutationObserver(() => window.requestAnimationFrame(decorateToolboxRows));
  observer.observe(toolboxElement, {childList: true, subtree: true, characterData: true});

  toolboxElement.addEventListener('contextmenu', (event) => {
    const row = event.target.closest('.blocklyTreeRow');
    const topic = row?.dataset.blockosLearningTopic;
    if (!topic) return;
    event.preventDefault();
    openLearningTopic(topic);
  });
}
