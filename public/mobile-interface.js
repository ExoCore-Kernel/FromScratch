(() => {
  const MOBILE_QUERY = '(max-width: 760px)';
  const toolbar = document.querySelector('.toolbar');
  const topbar = document.querySelector('.topbar');
  if (!toolbar || !topbar) return;

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

  const menu = document.createElement('details');
  menu.className = 'iphone-actions';
  menu.innerHTML = `
    <summary aria-label="More project actions" title="More actions">
      <span aria-hidden="true">•••</span>
    </summary>
    <div class="iphone-actions-sheet" role="menu">
      <div class="iphone-actions-title">
        <strong>Project tools</strong>
        <span>Files, export, learning and advanced build actions</span>
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
    customBlocksButton: ['◆', 'New block'],
    assetsButton: ['⌁', 'Files'],
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
    blocks: ['◫', 'Blocks'],
    code: ['‹›', 'Code'],
    run: ['▶', 'Run'],
  };
  document.querySelectorAll('.mobile-nav-button').forEach((button) => {
    const [icon, label] = navLabels[button.dataset.mobileTarget] || ['', button.textContent];
    button.innerHTML = `<span class="mobile-nav-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
  });

  function enterMobile() {
    document.body.classList.add('iphone-interface');
    toolbar.classList.add('iphone-toolbar');
    if (runButton) {
      runButton.dataset.mobileOriginalText ||= runButton.textContent;
      runButton.textContent = '▶ Build & Run';
    }
    for (const element of movable) sheet.append(element);
  }

  function leaveMobile() {
    document.body.classList.remove('iphone-interface');
    toolbar.classList.remove('iphone-toolbar');
    menu.open = false;
    if (runButton?.dataset.mobileOriginalText) {
      runButton.textContent = runButton.dataset.mobileOriginalText;
    }
    for (const element of movable) {
      const marker = originalPositions.get(element);
      marker?.after(element);
      if (element.dataset.mobileOriginalText) {
        element.textContent = element.dataset.mobileOriginalText;
      }
    }
  }

  function applyMode() {
    if (media.matches) enterMobile();
    else leaveMobile();
    window.dispatchEvent(new Event('resize'));
  }

  media.addEventListener?.('change', applyMode);
  applyMode();

  document.addEventListener('pointerdown', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
})();
