class Opus {
  constructor() {
    this.reader = null;
    this.sidePanel = null;
    this.rootElement = null;
    this.activePageId = 'overview';
    this._safeAreaHandler = null;
  }

  async run(env) {
    if (this.rootElement) {
      this.destroy();
    }

    if (!env || !env.container) {
      throw new Error('[Opus] run() requires an environment object with a valid container.');
    }

    this.env = env;
    this.rootElement = env.container;

    // Make Opus instance globally discoverable by DocumentReader and hotkeys
    globalThis._opusInstance = this;
    globalThis._cadPlanInstance = this;

    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';

    this.rootElement.style.overflowX = 'hidden';
    this.rootElement.style.overflowY = 'visible';
    this.rootElement.style.height = 'auto';
    this.rootElement.style.minHeight = '100vh';
    this.rootElement.style.boxSizing = 'border-box';
    this.rootElement.style.marginLeft = '0px';
    this.rootElement.style.width = '100%';

    const pages = [
      { id: 'overview', title: '0. Master Opus Gateway & 4-Quadrant Portal', docClass: () => globalThis.OpusOverviewContent },
      { id: 'verification', title: '1. Economic Impact & Public Verification', docClass: () => globalThis.OpusVerificationContent },
      { id: 'q1_cad', title: '2. Inventions & Spatial CAD (CadPlan, accuCad, accudraw)', docClass: () => globalThis.OpusQ1CadContent },
      { id: 'q2_narrative', title: '3. Personal Narrative & Legal Reality (situation, ValuationOfAccudraw)', docClass: () => globalThis.OpusQ2NarrativeContent },
      { id: 'q3_economics', title: '4. Post-Labor Macro-Economics & Robot Dividend (EconomicsOfAutomation, JobsAndAI)', docClass: () => globalThis.OpusQ3EconomicsContent },
      { id: 'q4_cockpit', title: '5. Fleet Infrastructure & Cockpit (HomeSetup, Luno, Library)', docClass: () => globalThis.OpusQ4CockpitContent },
      { id: 'strategy', title: '6. Grand Strategy: Guerrilla Playbook & Living Loop', docClass: () => globalThis.OpusGrandStrategyContent }
    ];

    this.reader = new DocumentReader({
      container: env.container,
      brandTitle: 'Rob Brown Opus • Master Living Portal',
      brandIcon: '🏛️',
      dossierId: 'Opus',
      pages: pages,
      itemNotes: globalThis.CadPlanItemNotes || null
    });

    await this.reader.init();

    // Initialize Aardvark in-situ element inspector
    if (typeof CadPlanAardvark !== 'undefined') {
      this.aardvark = new CadPlanAardvark({
        container: env.container,
        dossierId: 'Opus',
        itemNotes: globalThis.CadPlanItemNotes || null,
        documentReader: this.reader
      });
      this.aardvark.init();
      if (this.reader) {
        this.reader.aardvark = this.aardvark;
      }
    }

    if (typeof SidePanel !== 'undefined') {
      this.sidePanel = new SidePanel('left', 340, null);
      this._buildSidePanelNavigation(pages);
      this.sidePanel.open();
    }

    return this;
  }
  _buildSidePanelNavigation(pages) {
    if (!this.sidePanel) return;

    this.sidePanel.header.innerHTML = '';
    const headerTitle = document.createElement('div');
    headerTitle.style.cssText = 'font-family: var(--op-font-mono, monospace); font-size: 11px; font-weight: 800; color: #00f2fe; display: flex; align-items: center; gap: 8px; flex: 1;';
    headerTitle.innerHTML = '<span>🏛️</span><span>Rob Brown • Master Opus</span>';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'dr-nav-btn';
    closeBtn.style.cssText = 'padding: 3px 8px; font-size: 10px; border-radius: 4px;';
    closeBtn.textContent = '✕';
    closeBtn.onclick = () => this.sidePanel.close();

    this.sidePanel.header.appendChild(headerTitle);
    this.sidePanel.header.appendChild(closeBtn);

    const container = this.sidePanel.contentContainer;
    container.innerHTML = '';
    container.style.cssText = 'flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px; display: flex; flex-direction: column; gap: 8px; font-family: var(--op-font-sans, system-ui);';

    const searchInput = document.createElement('input');
    searchInput.className = 'op-sidebar-search';
    searchInput.placeholder = '🔍 Filter chapters or topics...';
    searchInput.oninput = (e) => {
      const q = e.target.value.toLowerCase().trim();
      container.querySelectorAll('.op-chapter-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (!q || text.includes(q)) ? 'block' : 'none';
      });
    };
    container.appendChild(searchInput);

    pages.forEach((page, idx) => {
      const isCur = page.id === this.activePageId;
      const card = document.createElement('div');
      card.className = `op-chapter-card ${isCur ? 'active' : ''}`;
      card.dataset.pageId = page.id;

      const titleParts = page.title.split('.');
      const num = titleParts[0].trim();
      const title = titleParts.slice(1).join('.').trim() || page.title;

      let badgeText = 'HUB';
      if (idx === 6) badgeText = 'STRAT';
      else if (idx > 0) badgeText = 'Q-' + idx;

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
          <div style="display:flex; align-items:flex-start; gap:6px; flex:1;">
            <span style="font-family:monospace; font-weight:bold; color:#00f2fe; font-size:11px;">${num}.</span>
            <span style="font-size:11.5px; font-weight:bold; color:#f8fafc; line-height:1.35;">${title}</span>
          </div>
          <span style="font-size:9px; color:#64748b; font-family:monospace; flex-shrink:0;">${badgeText}</span>
        </div>
      `;

      card.onclick = () => this.selectChapter(page.id);
      container.appendChild(card);
    });
  }
  selectChapter(pageId, targetBlockId = null) {
    this.activePageId = pageId;

    if (this.sidePanel) {
      this.sidePanel.contentContainer.querySelectorAll('.op-chapter-card').forEach(c => {
        c.classList.toggle('active', c.dataset.pageId === pageId);
      });
    }

    if (this.reader && typeof this.reader.switchPage === 'function') {
      this.reader.switchPage(pageId, true);
    }

    if (targetBlockId) {
      setTimeout(() => {
        if (this.reader && typeof this.reader.highlightTarget === 'function') {
          this.reader.highlightTarget(targetBlockId);
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  destroy() {
    if (this.aardvark) {
      this.aardvark.destroy();
      this.aardvark = null;
    }
    if (this.sidePanel) {
      this.sidePanel.destroy();
      this.sidePanel = null;
    }
    if (this.reader && typeof this.reader.destroy === 'function') {
      this.reader.destroy();
      this.reader = null;
    }
    if (globalThis._opusInstance === this) globalThis._opusInstance = null;
    if (globalThis._cadPlanInstance === this) globalThis._cadPlanInstance = null;
    this.rootElement = null;
  }
}

globalThis.Opus = Opus;
if (typeof module !== 'undefined' && module.exports) module.exports = Opus;