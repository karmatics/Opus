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

      if (typeof DomBasics !== 'undefined' && typeof DomBasics.run === 'function') {
        DomBasics.run();
      }

      this.env = env;
      this.rootElement = env.container;

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

      if (typeof KeyCommandHandler !== 'undefined' && typeof KeyCommandHandler.setPaused === 'function') {
        KeyCommandHandler.setPaused(true);
      }

      const pages = [
        { id: 'overview', title: '0. Master Opus Gateway & 4-Quadrant Portal', docClass: () => globalThis.OpusOverviewContent },
        { id: 'verification', title: '1. Economic Impact & Public Verification', docClass: () => globalThis.OpusVerificationContent },
        { id: 'q1_cad', title: '2. Inventions & Spatial CAD (CadPlan, accuCad, accudraw)', docClass: () => globalThis.OpusQ1CadContent },
        { id: 'q2_narrative', title: '3. Personal Narrative & Legal Reality (situation, ValuationOfAccudraw)', docClass: () => globalThis.OpusQ2NarrativeContent },
        { id: 'q3_economics', title: '4. Post-Labor Macro-Economics & Robot Dividend (EconomicsOfAutomation, JobsAndAI)', docClass: () => globalThis.OpusQ3EconomicsContent },
        { id: 'q4_cockpit', title: '5. Fleet Infrastructure & Cockpit (HomeSetup, Luno, Library)', docClass: () => globalThis.OpusQ4CockpitContent },
        { id: 'strategy', title: '6. Grand Strategy: Guerrilla Playbook & Living Loop', docClass: () => globalThis.OpusGrandStrategyContent }
      ];
      this._pages = pages;

      this.reader = new DocumentReader({
        container: env.container,
        brandTitle: 'Rob Brown Opus • Master Living Portal',
        brandIcon: '🏛️',
        dossierId: 'Opus',
        pages: pages,
        itemNotes: globalThis.CadPlanItemNotes || null,
        itemNotesClass: globalThis.CadPlanItemNotes || null,
        editorClass: globalThis.CadPlanDocumentEditor || null
      });

      this.activePageId = this.reader.currentPageId || 'overview';

      const origSwitchPage = this.reader.switchPage.bind(this.reader);
      this.reader.switchPage = (pageId, updateUrl = true) => {
        origSwitchPage(pageId, updateUrl);
        this._syncSidebarActiveState(pageId);
      };

      await this.reader.init();

      if (this.reader.navBar && typeof OpusRouterComponent !== 'undefined') {
        const leftNavGroup = this.reader.navBar.firstElementChild;
        if (leftNavGroup) {
          const portalLink = makeElement('a', {
            href: OpusRouterComponent.resolveAppUrl('Portal'),
            className: 'dr-nav-btn',
            title: 'Return to Public Portal Front Page',
            style: {
              padding: '5px 11px',
              fontSize: '0.76rem',
              fontWeight: '800',
              color: '#00f2fe',
              borderColor: 'rgba(0, 242, 254, 0.45)',
              background: 'rgba(0, 242, 254, 0.08)',
              borderRadius: '20px',
              textDecoration: 'none'
            }
          }, '← Portal');
          leftNavGroup.insertBefore(portalLink, leftNavGroup.firstChild);
        }
      }

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
        this.reader.options.sidePanel = this.sidePanel;
        this._buildSidePanelNavigation(pages);
        this._syncSidebarActiveState(this.reader.currentPageId);
        if (window.innerWidth >= 860) {
          this.sidePanel.open();
        }
      }

      if (typeof CadPlanItemNotes !== 'undefined' && typeof CadPlanItemNotes.subscribe === 'function') {
        this._unsubNotes = CadPlanItemNotes.subscribe(() => {
          if (this.sidePanel && this._pages) {
            this._buildSidePanelNavigation(this._pages);
            this._syncSidebarActiveState(this.activePageId);
          }
        });
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
    this.sidePanel.header.append(headerTitle, closeBtn);

    const container = this.sidePanel.contentContainer;
    container.innerHTML = '';
    container.style.cssText = 'flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px; display: flex; flex-direction: column; gap: 8px; font-family: var(--op-font-sans, system-ui);';

    const searchInput = document.createElement('input');
    searchInput.className = 'op-sidebar-search';
    searchInput.placeholder = '🔍 Filter chapters or topics...';
    searchInput.oninput = (e) => {
      const q = e.target.value.toLowerCase().trim();
      container.querySelectorAll('.op-chapter-card').forEach(card => {
        card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? 'block' : 'none';
      });
    };
    container.appendChild(searchInput);

    const localMap = (typeof CadPlanItemNotes !== 'undefined' && CadPlanItemNotes.getLocalMap) ? CadPlanItemNotes.getLocalMap() : {};
    pages.forEach((page, idx) => {
      const doc = page.docClass ? page.docClass() : null;
      const manifest = doc?.manifest ? doc.manifest() : [];
      const isCur = page.id === this.activePageId;
      let notesCnt = 0;
      Object.keys(localMap).forEach(k => { if (k.startsWith(`Opus:${page.id}:`)) notesCnt += (localMap[k] || []).filter(n => n.status !== 'resolved').length; });
      const hasLab = manifest.some(sec => (sec.blocks || []).some(b => b.type === 'component'));
      const parts = page.title.split('.');
      const badgeText = idx === 6 ? 'STRAT' : (idx > 0 ? 'Q-' + idx : 'HUB');

      const card = document.createElement('div');
      card.className = `op-chapter-card ${isCur ? 'active' : ''}`;
      card.dataset.pageId = page.id;

      const headerRow = document.createElement('div');
      headerRow.className = 'op-chapter-header-row';
      headerRow.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:7px; flex:1; min-width:0;">
          <span class="op-chapter-chevron" style="font-size:9px; color:#64748b; width:10px; flex-shrink:0; margin-top:2px;">${isCur ? '▼' : '▶'}</span>
          <span style="font-family:monospace; font-weight:bold; color:#00f2fe; font-size:11px; flex-shrink:0;">${parts[0].trim()}.</span>
          <span style="font-size:11.5px; font-weight:bold; color:#f8fafc; line-height:1.35; word-break:break-word;">${parts.slice(1).join('.').trim() || page.title}</span>
        </div>
        <div style="display:flex; gap:4px; align-items:center; flex-shrink:0;">
          ${hasLab ? '<span style="background:rgba(0,242,254,0.16); color:#00f2fe; border:1px solid rgba(0,242,254,0.4); font-size:8.5px; padding:1px 5px; border-radius:4px; font-weight:800; font-family:monospace;">⚡</span>' : ''}
          ${notesCnt > 0 ? `<span style="background:rgba(16,185,129,0.2); color:#10b981; border:1px solid #10b98188; font-size:9px; padding:1px 6px; border-radius:10px; font-weight:800; font-family:monospace;">${notesCnt} 📝</span>` : ''}
          <span style="font-size:9px; color:#64748b; font-family:monospace;">${badgeText}</span>
        </div>`;
      headerRow.onclick = () => this.selectChapter(page.id);
      card.appendChild(headerRow);

      const sectionsList = document.createElement('div');
      sectionsList.className = 'op-chapter-sections-list';
      sectionsList.style.display = isCur ? 'flex' : 'none';
      manifest.forEach((sec) => {
        const secItem = document.createElement('div');
        secItem.className = 'op-section-item';
        secItem.textContent = `• ${sec.title}`;
        secItem.onclick = (e) => { e.stopPropagation(); this.selectChapter(page.id, sec.blocks?.[0]?.id || (sec.section ? `sec-${sec.section}` : null)); };
        sectionsList.appendChild(secItem);
      });
      card.appendChild(sectionsList);
      container.appendChild(card);
    });

    container.appendChild(this._buildSidebarToolsGrid());
  }

  selectChapter(pageId, targetBlockId = null) {
      this.activePageId = pageId;

      if (this.sidePanel) {
        this.sidePanel.contentContainer.querySelectorAll('.op-chapter-card').forEach(c => {
          c.classList.toggle('active', c.dataset.pageId === pageId);
        });
        if (window.innerWidth < 860) {
          this.sidePanel.close();
        }
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
      if (this._unsubNotes) {
        try { this._unsubNotes(); } catch (e) {}
        this._unsubNotes = null;
      }
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

  _syncSidebarActiveState(pageId) {
        this.activePageId = pageId;
        if (this.sidePanel && this.sidePanel.contentContainer) {
          this.sidePanel.contentContainer.querySelectorAll('.op-chapter-card').forEach(c => {
            const isCur = c.dataset.pageId === pageId;
            c.classList.toggle('active', isCur);
            const list = c.querySelector('.op-chapter-sections-list');
            if (list) list.style.display = isCur ? 'flex' : 'none';
            const chevron = c.querySelector('.op-chapter-chevron');
            if (chevron) chevron.textContent = isCur ? '▼' : '▶';
          });
        }
      }

  _buildSidebarToolsGrid() {
    const toolsDet = document.createElement('details');
    toolsDet.open = true;
    toolsDet.style.cssText = 'margin-top: 8px; border: 1px solid #1e293b; background: #080c16; border-radius: 8px; overflow: hidden;';
    const summary = document.createElement('summary');
    summary.style.cssText = 'padding: 8px 12px; font-family: var(--op-font-mono, monospace); font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; cursor: pointer; background: #0f172a;';
    summary.textContent = '⚙️ Living Spec Utilities';
    toolsDet.appendChild(summary);

    const grid = document.createElement('div');
    grid.style.cssText = 'padding: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;';
    const makeBtn = (label, icon, color, onClick) => {
      const b = document.createElement('button');
      b.className = 'dr-nav-btn';
      b.style.cssText = `padding: 6px 8px; font-size: 10px; justify-content: center; color: ${color}; border-color: ${color}44; border-radius: 6px; font-family: monospace; font-weight: bold;`;
      b.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
      b.onclick = onClick;
      return b;
    };

    grid.appendChild(makeBtn('Directives', '⚡', '#d2a8ff', () => typeof CadPlanItemNotes !== 'undefined' && CadPlanItemNotes.openPromptBuilderDialog(this.reader)));
    grid.appendChild(makeBtn('Clip Notes', '📋', '#10b981', (e) => this.reader && this.reader.copyNotesBundle(e.currentTarget)));
    grid.appendChild(makeBtn('Revisions', '✏️', '#f59e0b', () => typeof CadPlanDocumentEditor !== 'undefined' && CadPlanDocumentEditor.openRevisionManager(() => this.reader.renderCurrentDocument(), 'Opus')));
    grid.appendChild(makeBtn('Inspect', '🔍', '#38bdf8', () => this.aardvark && this.aardvark.toggle()));
    grid.appendChild(makeBtn('Export MD', '📤', '#00f2fe', () => this.reader && this.reader.showExportDialog()));
    grid.appendChild(makeBtn('Summaries', '🧭', '#a3e635', () => typeof OpusSummaries !== 'undefined' && navigator.clipboard?.writeText(OpusSummaries.toMarkdown()).then(() => alert('✓ Copied Opus Tier-0 Summaries to clipboard!'))));

    toolsDet.appendChild(grid);
    return toolsDet;
  }
}

globalThis.Opus = Opus;
if (typeof module !== 'undefined' && module.exports) module.exports = Opus;