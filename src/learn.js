import './learn.css';
import {
  blockResultLabel,
  customBlockCategory,
  learningCategories,
  learningCategoryMap,
  normalizeCategoryName,
} from './learning-content.js';

const topicList = document.querySelector('#topicList');
const topicCount = document.querySelector('#topicCount');
const content = document.querySelector('#learnContent');
const searchInput = document.querySelector('#learnSearch');

let activeTopic = '';
let activeBlock = '';

function element(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function codeBlock(source) {
  const pre = element('pre', 'learn-code');
  const code = element('code');
  code.textContent = source;
  pre.append(code);
  return pre;
}

function setUrl(topic, block = '') {
  const params = new URLSearchParams();
  if (topic) params.set('topic', topic);
  if (block) params.set('block', block);
  history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
}

function renderSidebar(filter = '') {
  topicList.replaceChildren();
  const query = filter.trim().toLowerCase();
  const categories = learningCategories.filter((category) => {
    if (!query) return true;
    const guide = category.guide ?? learningCategoryMap.get(category.name)?.guide;
    return [
      category.name,
      guide?.tooltip,
      guide?.implementation,
      ...(guide?.concepts ?? []),
      ...category.blocks.flatMap((block) => [block.label, block.type, block.description]),
    ].join(' ').toLowerCase().includes(query);
  });

  topicCount.textContent = `${categories.length}/${learningCategories.length}`;
  for (const category of categories) {
    const button = element('button', `learn-topic-link${category.name === activeTopic ? ' active' : ''}`);
    button.type = 'button';
    const colour = element('span', 'learn-topic-colour');
    colour.style.setProperty('--topic-hue', String(category.colour ?? 210));
    const name = element('span', 'learn-topic-name', category.name);
    button.append(colour, name);
    button.title = category.guide?.tooltip ?? '';
    button.addEventListener('click', () => showTopic(category.name));
    topicList.append(button);
  }
}

function addListPanel(parent, title, values) {
  const panel = element('section', 'learn-panel');
  panel.append(element('h3', '', title));
  const list = element('ul');
  for (const value of values) list.append(element('li', '', value));
  panel.append(list);
  parent.append(panel);
}

async function loadSource(block, holder, button) {
  button.disabled = true;
  button.textContent = 'Loading C…';
  try {
    const response = await fetch(`/api/learning/source?symbol=${encodeURIComponent(block.sourceSymbol)}`, {cache: 'no-store'});
    const result = await response.json();
    if (!result.ok) throw new Error(result.output || 'Source was not found.');
    holder.replaceChildren();
    holder.className = 'learn-source';
    holder.append(element('div', 'learn-source-meta', `${result.file} · actual source used by this BlockOS installation`));
    holder.append(codeBlock(result.source));
    button.remove();
  } catch (error) {
    holder.replaceChildren(element('div', 'learn-note', error instanceof Error ? error.message : String(error)));
    button.disabled = false;
    button.textContent = 'Retry actual runtime C';
  }
}

function renderBlock(block, selectedType) {
  const card = element('section', `learn-block-card${block.type === selectedType ? ' highlighted' : ''}`);
  card.id = `block-${block.type}`;

  const heading = element('div', 'learn-block-heading');
  const headingText = element('div');
  headingText.append(element('h3', '', block.label), element('div', 'learn-block-type', block.type));
  heading.append(headingText, element('span', 'learn-block-result', blockResultLabel(block)));
  card.append(heading);

  card.append(element('p', 'learn-block-description', block.description || 'This block is provided by the BlockOS runtime capability layer.'));

  if (block.args?.length) {
    const inputs = element('div', 'learn-block-inputs');
    for (const argument of block.args) {
      inputs.append(element('span', 'learn-input-chip', `${argument.name}: ${argument.type}`));
    }
    card.append(inputs);
  } else {
    card.append(element('div', 'learn-note', 'Inputs: none'));
  }

  card.append(element('h3', '', 'Generated C'));
  card.append(codeBlock(block.generatedC || `${block.cName ?? block.type}(...);`));

  if (block.sourceSymbol) {
    const actions = element('div', 'learn-block-actions');
    const button = element('button', 'learn-source-button', 'Show actual runtime C');
    button.type = 'button';
    const holder = element('div');
    button.addEventListener('click', () => loadSource(block, holder, button));
    actions.append(button);
    card.append(actions, holder);
  } else {
    card.append(element('div', 'learn-note', 'This block is generated directly as C syntax, so there is no separate runtime function.'));
  }

  return card;
}

function renderCustomSpecs(parent) {
  const custom = customBlockCategory();
  if (!custom.specs.length) return;
  const section = element('section', 'learn-section');
  section.append(element('h2', '', 'Custom blocks currently saved in this browser'));
  const list = element('div', 'learn-block-list');
  for (const spec of custom.specs) {
    const card = element('section', 'learn-block-card');
    card.append(element('h3', '', spec.displayName || 'custom block'));
    const inputs = element('div', 'learn-block-inputs');
    for (const argument of spec.arguments ?? []) {
      const type = argument.type?.kind === 'custom' ? argument.type.customName : argument.type?.kind ?? 'number';
      inputs.append(element('span', 'learn-input-chip', `${argument.displayName}: ${type}`));
    }
    if (!inputs.children.length) inputs.append(element('span', 'learn-input-chip', 'No arguments'));
    card.append(inputs);
    card.append(codeBlock(`static void ${spec.cName || 'blockos_custom'}(/* typed arguments */) {\n    /* blocks from its definition */\n}`));
    list.append(card);
  }
  section.append(list);
  parent.append(section);
}

function showTopic(name, selectedBlock = '') {
  const categoryName = normalizeCategoryName(name);
  const category = learningCategoryMap.get(categoryName) ?? learningCategories[0];
  const guide = category.guide;

  activeTopic = category.name;
  activeBlock = selectedBlock;
  setUrl(activeTopic, activeBlock);
  renderSidebar(searchInput.value);
  content.replaceChildren();

  content.append(element('div', 'learn-breadcrumb', `Learning Center / ${category.name}`));

  const titleRow = element('div', 'learn-title-row');
  titleRow.append(element('h1', '', category.name));
  content.append(titleRow);
  content.append(element('p', 'learn-summary', guide.tooltip));

  const badges = element('div', 'learn-badges');
  badges.append(element('span', 'learn-badge', guide.level));
  badges.append(element('span', 'learn-badge runtime', guide.runtimeKind));
  badges.append(element('span', 'learn-badge', `${category.blocks.length} block${category.blocks.length === 1 ? '' : 's'}`));
  content.append(badges);

  const overview = element('section', 'learn-section');
  overview.append(element('h2', '', 'What this group teaches'));
  for (const paragraph of guide.overview) overview.append(element('p', '', paragraph));
  content.append(overview);

  const grid = element('div', 'learn-grid learn-section');
  addListPanel(grid, 'Know this first', guide.prerequisites);
  addListPanel(grid, 'Mental model', guide.concepts);
  content.append(grid);

  const implementation = element('section', 'learn-section');
  implementation.append(element('h2', '', 'How BlockOS implements it'));
  implementation.append(element('p', '', guide.implementation));
  implementation.append(codeBlock(guide.cExample));
  implementation.append(element('div', 'learn-warning', `Important: ${guide.safety}`));
  implementation.append(element('div', 'learn-exercise', `Learning exercise: ${guide.exercise}`));
  content.append(implementation);

  const blocksSection = element('section', 'learn-section');
  blocksSection.append(element('h2', '', 'Blocks in this group'));
  blocksSection.append(element('p', 'learn-note', 'The first snippet shows the C emitted by the visual block. “Show actual runtime C” reads the exact function from this BlockOS installation.'));
  const blockList = element('div', 'learn-block-list');
  for (const block of category.blocks) blockList.append(renderBlock(block, selectedBlock));
  blocksSection.append(blockList);
  content.append(blocksSection);

  if (category.name === 'Custom functions') renderCustomSpecs(content);

  content.focus({preventScroll: true});
  if (selectedBlock) {
    requestAnimationFrame(() => document.querySelector(`#block-${CSS.escape(selectedBlock)}`)?.scrollIntoView({behavior: 'smooth', block: 'center'}));
  } else {
    scrollTo({top: 0, behavior: 'smooth'});
  }
}

function renderSearchResults(query) {
  const terms = query.trim().toLowerCase();
  content.replaceChildren();
  content.append(element('div', 'learn-breadcrumb', 'Learning Center / Search'));
  content.append(element('h1', '', `Search: ${query}`));
  const results = [];

  for (const category of learningCategories) {
    const guide = category.guide;
    if ([category.name, guide.tooltip, guide.implementation, ...guide.concepts].join(' ').toLowerCase().includes(terms)) {
      results.push({category, block: null});
    }
    for (const block of category.blocks) {
      if ([block.label, block.type, block.description, block.cName].join(' ').toLowerCase().includes(terms)) {
        results.push({category, block});
      }
    }
  }

  if (!results.length) {
    content.append(element('div', 'learn-empty', 'No guides or blocks matched that search.'));
    return;
  }

  const list = element('div', 'learn-search-results learn-section');
  for (const result of results.slice(0, 80)) {
    const row = element('button', 'learn-search-result');
    row.type = 'button';
    row.append(
      element('strong', '', result.block ? result.block.label : result.category.name),
      element('span', '', result.block ? `${result.category.name} · ${result.block.description}` : result.category.guide.tooltip),
    );
    row.addEventListener('click', () => showTopic(result.category.name, result.block?.type ?? ''));
    list.append(row);
  }
  content.append(list);
}

let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    const query = searchInput.value.trim();
    renderSidebar(query);
    if (query.length >= 2) renderSearchResults(query);
    else showTopic(activeTopic || learningCategories[0].name, activeBlock);
  }, 90);
});

window.addEventListener('popstate', () => {
  const params = new URLSearchParams(location.search);
  showTopic(params.get('topic') || learningCategories[0].name, params.get('block') || '');
});

const initial = new URLSearchParams(location.search);
showTopic(initial.get('topic') || learningCategories[0].name, initial.get('block') || '');
