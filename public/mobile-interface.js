(() => {
  const MOBILE_QUERY = '(max-width: 760px)';
  const toolbar = document.querySelector('.toolbar');
  const topbar = document.querySelector('.topbar');
  const workspacePanel = document.querySelector('.workspace-panel');
  if (!toolbar || !topbar || !workspacePanel) return;

  const media = window.matchMedia(MOBILE_QUERY);
  const runButton = document.getElementById('buildRunButton');
  const movable = [...toolbar.children].filter((element) => {
    return element !== runButton && !(element instanceof HTMLInputElement && element.hidden);
  });

  const originalPositions = new Map();
  for (const element of movable) {
    const marker = document.createComment(`mobile-home:${element.id || element.tagName}`);
    element.before(marker);
    originalPositions.set(element, marker);
  }

  const brandText = document.querySelector('.brand > div:last-child');
  const subtitle = document.createElement('span');
  subtitle.className = 'iphone-kernel-subtitle';
  subtitle.innerHTML = '<i aria-hidden="true"></i>x86_64 kernel';
  brandText?.append(subtitle);

  const menu = document.createElement('details');
  menu.className = 'iphone-actions';
  menu.innerHTML = `
    <summary aria-label="More project actions" title="More actions">
      <span aria-hidden="true">•••</span>
    </summary>
    <div class="iphone-actions-sheet" role="menu">
      <div class="iphone-actions-title">
        <strong>Project tools</strong>
        <span>Project files, learning, exports and advanced build actions</span>
      </div>
    </div>
  `;
  const sheet = menu.querySelector('.iphone-actions-sheet');
  topbar.append(menu);

  const labels = {
    newButton: ['＋', 'New'],
    saveButton: ['↓', 'Save'],
    loadButton: ['↑', 'Load'],
    projectFileButton: ['▣', 'Project'],
    learnButton: ['?', 'Learn'],
    customBlocksButton: ['ƒx', 'New block'],
    assetsButton: ['▰', 'Files'],
    exportIsoButton: ['ISO', 'Export ISO'],
    compileButton: ['C', 'Compile ELF'],
  };

  for (const element of movable) {
    const [icon, label] = labels[element.id] || ['•', element.textContent.trim()];
    element.dataset.mobileOriginalText = element.textContent;
    element.innerHTML = `<span class="iphone-action-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
    element.setAttribute('role', 'menuitem');
    element.addEventListener('click', () => {
      menu.open = false;
    });
  }

  const navLabels = {
    blocks: ['✚', 'Blocks'],
    code: ['</>', 'Code'],
    run: ['▶', 'Run'],
  };
  document.querySelectorAll('.mobile-nav-button').forEach((button) => {
    const [icon, label] = navLabels[button.dataset.mobileTarget] || ['', button.textContent];
    button.innerHTML = `<span class="mobile-nav-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
  });

  const toolboxOpenButton = document.createElement('button');
  toolboxOpenButton.type = 'button';
  toolboxOpenButton.className = 'iphone-toolbox-open';
  toolboxOpenButton.innerHTML = '<span aria-hidden="true">☰</span> Blocks';
  toolboxOpenButton.setAttribute('aria-label', 'Show block categories');
  workspacePanel.append(toolboxOpenButton);

  const categoryIcons = [
    [/starting/, '⚑'], [/kernel basics/, '>_'], [/screen/, '▣'], [/flow/, '⟳'],
    [/values/, '×'], [/math|logic/, 'Σ'], [/variables/, '▱'], [/files|dependencies/, '▰'],
    [/custom/, 'ƒx'], [/hardware/, '▧'], [/kernel services/, '⚙'], [/cpu/, '▦'],
    [/interrupt/, 'ϟ'], [/physical memory/, 'RAM'], [/virtual memory/, '◇'], [/heap/, '▥'],
    [/process/, '●'], [/thread/, '≋'], [/synchron/, '⇄'], [/timer|clock/, '◷'],
    [/keyboard|mouse/, '◉'], [/graphics/, '▧'], [/text|windows/, 'T'],
  ];

  function iconFor(text) {
    const normalized = text.toLowerCase();
    return categoryIcons.find(([pattern]) => pattern.test(normalized))?.[1] || '◆';
  }

  function requestBlocklyResize() {
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 30);
  }

  function setToolboxCollapsed(collapsed) {
    document.body.classList.toggle('iphone-toolbox-collapsed', collapsed);
    toolboxOpenButton.hidden = !collapsed;
    try {
      localStorage.setItem('blockos-iphone-toolbox-collapsed', collapsed ? '1' : '0');
    } catch {
      // Storage is optional.
    }
    requestBlocklyResize();
  }

  toolboxOpenButton.addEventListener('click', () => setToolboxCollapsed(false));

  function enhanceToolbox() {
    const toolbox = document.querySelector('.blocklyToolboxDiv');
    if (!toolbox || toolbox.dataset.iphoneEnhanced === '1') return false;
    toolbox.dataset.iphoneEnhanced = '1';

    const searchBar = document.createElement('div');
    searchBar.className = 'iphone-toolbox-search';
    searchBar.innerHTML = `
      <label>
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Search blocks…" autocomplete="off" autocapitalize="none" />
      </label>
      <button type="button" aria-label="Hide block categories" title="Hide block categories">‹</button>
    `;
    toolbox.prepend(searchBar);

    const input = searchBar.querySelector('input');
    const collapse = searchBar.querySelector('button');
    collapse.addEventListener('click', () => setToolboxCollapsed(true));

    function categoryRows() {
      const treeRows = [...toolbox.querySelectorAll('.blocklyTreeRow')];
      if (treeRows.length) return treeRows;
      return [...toolbox.querySelectorAll('.blocklyToolboxCategory')];
    }

    function decorateRows() {
      for (const row of categoryRows()) {
        if (row.dataset.iphoneDecorated === '1') continue;
        row.dataset.iphoneDecorated = '1';
        row.classList.add('iphone-toolbox-row');

        const label = row.querySelector('.blocklyTreeLabel, .blocklyToolboxCategoryLabel');
        const text = (label?.textContent || row.textContent || '').trim();
        row.dataset.iphoneSearchText = text.toLowerCase();

        const computed = getComputedStyle(row);
        const categoryColour = computed.borderLeftColor && computed.borderLeftColor !== 'rgba(0, 0, 0, 0)'
          ? computed.borderLeftColor
          : '#7c3aed';

        const icon = document.createElement('span');
        icon.className = 'iphone-toolbox-icon';
        icon.textContent = iconFor(text);
        icon.style.backgroundColor = categoryColour;

        const chevron = document.createElement('span');
        chevron.className = 'iphone-toolbox-chevron';
        chevron.textContent = '⌄';

        if (label) {
          label.before(icon);
          label.after(chevron);
        } else {
          row.prepend(icon);
          row.append(chevron);
        }
      }
    }

    function filterRows() {
      decorateRows();
      const query = input.value.trim().toLowerCase();
      for (const row of categoryRows()) {
        const container = row.closest('.blocklyToolboxCategory') || row;
        const text = row.dataset.iphoneSearchText || row.textContent.toLowerCase();
        container.hidden = Boolean(query) && !text.includes(query);
      }
    }

    input.addEventListener('input', filterRows);
    new MutationObserver(decorateRows).observe(toolbox, {childList: true, subtree: true});
    decorateRows();

    const savedCollapsed = (() => {
      try {
        return localStorage.getItem('blockos-iphone-toolbox-collapsed') === '1';
      } catch {
        return false;
      }
    })();
    setToolboxCollapsed(savedCollapsed);
    return true;
  }

  const toolboxObserver = new MutationObserver(() => {
    if (enhanceToolbox()) toolboxObserver.disconnect();
  });
  toolboxObserver.observe(document.documentElement, {childList: true, subtree: true});
  enhanceToolbox();

  let changingRunText = false;
  const runTextObserver = runButton ? new MutationObserver(() => {
    if (!media.matches || changingRunText || runButton.textContent === '▶ Build & Run') return;
    changingRunText = true;
    runButton.textContent = '▶ Build & Run';
    changingRunText = false;
  }) : null;
  runTextObserver?.observe(runButton, {childList: true, subtree: true, characterData: true});

  function enterMobile() {
    document.body.classList.add('iphone-interface');
    toolbar.classList.add('iphone-toolbar');
    subtitle.hidden = false;
    if (runButton) {
      runButton.dataset.mobileOriginalText ||= runButton.textContent;
      runButton.textContent = '▶ Build & Run';
    }
    for (const element of movable) sheet.append(element);
    enhanceToolbox();
  }

  function leaveMobile() {
    document.body.classList.remove('iphone-interface', 'iphone-toolbox-collapsed');
    toolbar.classList.remove('iphone-toolbar');
    menu.open = false;
    subtitle.hidden = true;
    toolboxOpenButton.hidden = true;
    if (runButton?.dataset.mobileOriginalText) {
      runButton.textContent = runButton.dataset.mobileOriginalText;
    }
    for (const element of movable) {
      const marker = originalPositions.get(element);
      marker?.after(element);
      if (element.dataset.mobileOriginalText) element.textContent = element.dataset.mobileOriginalText;
    }
  }

  function applyMode() {
    if (media.matches) enterMobile();
    else leaveMobile();
    requestBlocklyResize();
  }

  media.addEventListener?.('change', applyMode);
  applyMode();

  document.addEventListener('pointerdown', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
})();
