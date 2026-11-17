class OpusRouterComponent {

  static render(container) {
    container.innerHTML = '';
    const state = { activeFilter: 'all', activeTier: 1, query: '' };

    const wrap = makeElement('div', {
      style: {
        background: '#070a13', border: '1.5px solid #21262d', borderRadius: '12px',
        overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex', flexDirection: 'column', fontFamily: 'monospace'
      }
    });

    const cardsGrid = makeElement('div', {
      id: 'opus-dossier-grid',
      style: {
        padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '12px', background: '#090d16', maxHeight: '520px', overflowY: 'auto'
      }
    });

    const refresh = () => this._renderGrid(cardsGrid, state);

    wrap.appendChild(this._buildHeader());
    wrap.appendChild(this._buildTierStrip(state, wrap, refresh));
    wrap.appendChild(this._buildFetchBar());
    wrap.appendChild(this._buildSearchBar(state, refresh));
    wrap.appendChild(cardsGrid);
    wrap.appendChild(this._buildFooter());

    refresh();
    container.appendChild(wrap);
  }

  static async openFileViewer(filePath) {
      const cleanPath = filePath.trim().replace(/^\/+/, '');
      let url = cleanPath.startsWith('http') ? cleanPath : `../${cleanPath}`;
      if (!cleanPath.startsWith('http') && typeof window !== 'undefined' && window.location) {
        if (window.location.hostname.endsWith('.github.io')) {
          const user = window.location.hostname.split('.')[0] || 'karmatics';
          url = `https://${user}.github.io/${cleanPath}`;
        } else if (window.location.protocol === 'about:') {
          try {
            const pOrigin = window.parent?.location?.origin;
            if (pOrigin && pOrigin !== 'null') url = `${pOrigin}/${cleanPath}`;
          } catch (e) {}
        }
      }

      let content = '';
      let errorMsg = null;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        content = await res.text();
      } catch (err) {
        errorMsg = `Failed to fetch file from "${url}": ${err.message}`;
      }

      const overlay = makeElement('div', {
        style: {
          position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.85)', zIndex: '10000', display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
        }
      });

      const dialog = makeElement('div', {
        style: {
          width: '900px', maxWidth: '96vw', maxHeight: '90vh', background: '#070a13',
          border: '1.5px solid #00f2fe', borderRadius: '10px', display: 'flex',
          flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,242,254,0.2)',
          fontFamily: 'monospace', overflow: 'hidden'
        }
      });

      const lines = errorMsg ? 0 : content.split('\n').length;
      const chars = errorMsg ? 0 : content.length;

      const titleBar = makeElement('div', {
        style: {
          padding: '10px 16px', background: '#0f172a', borderBottom: '1px solid #1e293b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('span', { style: { fontSize: '15px' } }, '⚡'),
          makeElement('strong', { style: { color: '#00f2fe', fontSize: '12px' } }, cleanPath),
          makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, `(${lines} lines, ${chars} chars)`)
        ]),
        makeElement('button', {
          className: 'dr-nav-btn', style: { padding: '2px 8px', fontSize: '11px' },
          onclick: () => document.body.removeChild(overlay)
        }, '✕ Close')
      ]);
      dialog.appendChild(titleBar);

      dialog.appendChild(makeElement('pre', {
        style: {
          flex: '1', margin: '0', padding: '14px', background: '#020408',
          color: errorMsg ? '#ef4444' : '#e2e8f0', fontSize: '11px', lineHeight: '1.5',
          overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', userSelect: 'text'
        }
      }, errorMsg || content));

      dialog.appendChild(makeElement('div', {
        style: {
          padding: '10px 16px', background: '#090d16', borderTop: '1px solid #1e293b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
        }
      }, [
        makeElement('span', { style: { fontSize: '10.5px', color: '#94a3b8' } }, 'Accumulative Outbox Staging Active'),
        makeElement('div', { style: { display: 'flex', gap: '8px' } }, [
          makeElement('button', {
            className: 'dr-nav-btn', style: { padding: '5px 12px', fontSize: '11px' },
            onclick: () => {
              if (errorMsg) return alert('Cannot copy file due to error.');
              const closeTag = '</' + 'script>';
              const bundle = `<script data-file="${cleanPath}">\n${content}\n${closeTag}`;
              navigator.clipboard.writeText(bundle).then(() => alert(`✓ Copied single container for [${cleanPath}] to clipboard!`));
            }
          }, '📋 Copy Single File'),
          makeElement('button', {
            className: 'dr-nav-btn primary',
            style: { padding: '5px 14px', fontSize: '11px', fontWeight: 'bold', background: '#0284c7', borderColor: '#38bdf8', color: '#fff' },
            onclick: () => {
              if (errorMsg) return alert('Cannot stage file due to error.');
              const oq = globalThis.OutboxQueue || window.parent?.OutboxQueue || window.opener?.OutboxQueue;
              if (oq && typeof oq.addBundle === 'function') {
                oq.addBundle(`File: ${cleanPath}`, content, { priority: 'normal', files: [cleanPath] });
                alert(`✓ Staged [${cleanPath}] into Outbox!`);
              } else {
                navigator.clipboard?.writeText(content).then(() => alert(`✓ Copied [${cleanPath}] to clipboard!`));
              }
            }
          }, '📤 Stage into Outbox Queue')
        ])
      ]));

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
    }
  static pushSelectedTierToOutbox(tierNum, tierText) {
    if (typeof OutboxQueue !== 'undefined') {
      OutboxQueue.addItem(`Opus Tier ${tierNum} Prompt Bundle`, tierText, {
        type: 'spec',
        meta: { tier: tierNum, source: 'OpusRouterComponent' }
      });
      const count = OutboxQueue.getCount();
      alert(`✓ Staged Tier ${tierNum} bundle into Outbox!\n(${count} item${count === 1 ? '' : 's'} now in queue)`);
    } else {
      navigator.clipboard.writeText(tierText).then(() => alert(`✓ Copied Tier ${tierNum} prompt to clipboard!`));
    }
  }

  static _buildHeader() {
    return makeElement('div', {
      style: {
        padding: '12px 16px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid #21262d',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '18px' } }, '🏛️'),
        makeElement('div', {}, [
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', display: 'block' } }, 'Tiered Knowledge Router & Context Preservation Engine'),
          makeElement('span', { style: { fontSize: '10px', color: '#94a3b8' } }, 'Selective Depth • Zero Token Waste • Falsifiable Ground Truth')
        ])
      ]),
      makeElement('span', {
        id: 'opus-budget-pill',
        style: { fontSize: '10.5px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }
      }, 'Token Budget: ~1,200 tokens (Tier 1)')
    ]);
  }

  static _buildTierStrip(state, wrap, onTierChange) {
    const budgets = ['~250 tokens (Tier 0)', '~1,200 tokens (Tier 1)', '~2,500 tokens (Tier 2)', 'Interactive File Pointers (Tier 3)'];
    const labels = ['Tier 0: Synopsis (~250 tkn)', 'Tier 1: Deep Spec (~1.2k tkn)', 'Tier 2: Math & Invariants (~2.5k tkn)', 'Tier 3: File Pointers'];
    const btns = [];

    const setTier = (t) => {
      state.activeTier = t;
      btns.forEach((b, i) => b.classList.toggle('active', i === t));
      const pill = wrap.querySelector('#opus-budget-pill');
      if (pill) pill.textContent = `Token Budget: ${budgets[t]}`;
      onTierChange();
    };

    labels.forEach((lbl, idx) => {
      btns.push(makeElement('button', { className: `dr-tab-btn ${idx === 1 ? 'active' : ''}`, onclick: () => setTier(idx) }, lbl));
    });

    const strip = makeElement('div', {
      style: {
        padding: '8px 16px', background: '#090d16', borderBottom: '1px solid #161e2b',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '11px'
      }
    });
    strip.appendChild(makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } }, [
      makeElement('span', { style: { color: '#64748b', fontWeight: 'bold' } }, 'Detail Level:'), ...btns
    ]));
    strip.appendChild(makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
      makeElement('button', {
        className: 'dr-nav-btn primary', style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: 'bold' },
        onclick: () => navigator.clipboard.writeText(this._generateTierPrompt(state)).then(() => alert(`✓ Copied Tier ${state.activeTier} prompt bundle to clipboard!`))
      }, '📋 Copy Tier Prompt'),
      makeElement('button', {
        className: 'dr-nav-btn', style: { padding: '4px 10px', fontSize: '10.5px', color: '#d2a8ff', borderColor: '#8257e5' },
        onclick: () => this.pushSelectedTierToOutbox(state.activeTier, this._generateTierPrompt(state))
      }, '📤 Push to Outbox')
    ]));
    return strip;
  }

  static _buildFetchBar() {
    const input = makeElement('input', {
      type: 'text',
      placeholder: '⚡ Pull any file from repo (e.g. Library/DocumentReader.js, situation/js/CourtFilingPage.js)...',
      style: {
        flex: '1 1 300px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '5px',
        padding: '5px 10px', color: '#00f2fe', fontSize: '11px', fontFamily: 'monospace', outline: 'none'
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) this.openFileViewer(input.value.trim());
    });
    const btn = makeElement('button', {
      className: 'dr-nav-btn', style: { padding: '4px 12px', fontSize: '10.5px', color: '#00f2fe', borderColor: '#00f2fe', fontWeight: 'bold' },
      onclick: () => input.value.trim() ? this.openFileViewer(input.value.trim()) : alert('Please enter a valid file path up to workspace root.')
    }, '⚡ Fetch File');

    return makeElement('div', {
      style: { padding: '8px 16px', background: '#070a13', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }
    }, [input, btn]);
  }

  static _buildSearchBar(state, onFilterChange) {
    const searchInput = makeElement('input', {
      type: 'text',
      placeholder: '🔍 Search projects, patents, models (e.g. AccuDraw, Court, 2.3B, Port 8080)...',
      style: {
        flex: '1 1 260px', background: '#070a13', border: '1px solid #30363d', borderRadius: '6px',
        padding: '6px 10px', color: '#00f2fe', fontSize: '11px', fontFamily: 'monospace', outline: 'none'
      },
      oninput: (e) => { state.query = e.target.value.toLowerCase().trim(); onFilterChange(); }
    });

    const qFilters = makeElement('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } });
    const defs = [
      { id: 'all', label: 'All Quadrants' },
      { id: 'I', label: 'Q-I: CAD Inventions' },
      { id: 'II', label: 'Q-II: Narrative & Valuation' },
      { id: 'III', label: 'Q-III: Post-Labor Economics' },
      { id: 'IV', label: 'Q-IV: Fleet & Cockpit' }
    ];
    defs.forEach(f => {
      const btn = makeElement('button', {
        className: `dr-tab-btn ${f.id === 'all' ? 'active' : ''}`,
        style: { padding: '3px 8px', fontSize: '10.5px' },
        onclick: () => {
          state.activeFilter = f.id;
          qFilters.querySelectorAll('.dr-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          onFilterChange();
        }
      }, f.label);
      qFilters.appendChild(btn);
    });

    return makeElement('div', {
      style: { padding: '10px 16px', background: '#0d1117', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }
    }, [searchInput, qFilters]);
  }

  static _renderGrid(cardsGrid, state) {
    cardsGrid.innerHTML = '';
    const filtered = this._filterCatalog(state);
    if (filtered.length === 0) {
      cardsGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 32px; text-align: center; color: #64748b; font-style: italic;">No projects matched your search.</div>';
      return;
    }
    filtered.forEach(item => cardsGrid.appendChild(this._renderCard(item, state.activeTier)));
  }

  static _renderCard(item, activeTier) {
      const appUrl = OpusRouterComponent.resolveAppUrl(item.name);
      const card = makeElement('div', {
        style: {
          background: 'rgba(255, 255, 255, 0.02)', border: `1px solid ${item.color}33`,
          borderLeft: `4px solid ${item.color}`, borderRadius: '8px', padding: '12px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px'
        }
      });

      card.appendChild(makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' } }, [
        makeElement('div', {}, [
          makeElement('span', { style: { fontSize: '10px', color: item.color, fontWeight: 'bold' } }, `QUADRANT ${item.quadrant} • `),
          makeElement('strong', { style: { color: '#f8fafc', fontSize: '13px' } }, `${item.icon} ${item.name}`),
          makeElement('div', { style: { color: item.color, fontSize: '10.5px', marginTop: '1px' } }, item.title)
        ]),
        makeElement('span', { style: { fontSize: '9px', background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}44`, padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' } }, `Q-${item.quadrant}`)
      ]));

      if (activeTier === 3 && item.files?.length) {
        const filesBox = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', background: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', padding: '8px', maxHeight: '160px', overflowY: 'auto' } });
        item.files.forEach(fPath => {
          filesBox.appendChild(makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 6px', borderRadius: '4px', background: '#0a0e1a', border: '1px solid #161e2b' } }, [
            makeElement('span', { style: { fontSize: '10.5px', color: '#38bdf8', fontFamily: 'monospace', wordBreak: 'break-all' } }, fPath),
            makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '9px', color: '#00f2fe' }, onclick: () => this.openFileViewer(fPath) }, '⚡ Fetch')
          ]));
        });
        card.appendChild(filesBox);
      } else {
        card.appendChild(makeElement('pre', {
          style: { margin: '0', padding: '8px', background: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '10.5px', color: activeTier === 2 ? '#10b981' : '#cbd5e1', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', maxHeight: '160px', overflowY: 'auto', lineHeight: '1.45' }
        }, item.tiers[activeTier] || item.tiers[0]));
      }

      card.appendChild(makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px solid #161e2b', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('a', { href: appUrl, target: '_blank', rel: 'noopener noreferrer', style: { color: '#38bdf8', textDecoration: 'none', fontSize: '10.5px', fontWeight: 'bold' } }, '↗ Open Tab'),
        makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
          makeElement('button', {
            className: 'dr-nav-btn', style: { padding: '2px 7px', fontSize: '9.5px' },
            onclick: () => {
              const lunoApp = globalThis.ClientApp || window.parent?.ClientApp || window.opener?.ClientApp;
              if (lunoApp && typeof lunoApp.switchExclusiveTargetProject === 'function') lunoApp.switchExclusiveTargetProject(item.name);
              else if (lunoApp && typeof lunoApp.setTargetProject === 'function') lunoApp.setTargetProject(item.name, { openTab: true });
              else window.open(appUrl, '_blank', 'noopener,noreferrer');
            }
          }, '🎯 Target in Luno'),
          makeElement('button', {
            className: 'dr-nav-btn', style: { padding: '2px 7px', fontSize: '9.5px', color: '#00f2fe' },
            onclick: () => navigator.clipboard.writeText(`# DOSSIER FOCUS: [${item.name}] - ${item.title}\nQuadrant: ${item.quadrant}\nTier ${activeTier} Detail:\n${item.tiers[activeTier]}\n`).then(() => alert(`✓ Copied Tier ${activeTier} context for [${item.name}]!`))
          }, '📋 Copy Tier')
        ])
      ]));
      return card;
    }
  static _buildFooter() {
    const count = this.getCatalog().length;
    return makeElement('div', {
      style: { padding: '10px 16px', background: '#0a0e1a', borderTop: '1px solid #21262d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#8b949e', flexWrap: 'wrap', gap: '8px' }
    }, [
      makeElement('span', {}, '💡 Click any file in Tier 3 or use the quick fetch bar to stage context without LLM token waste.'),
      makeElement('span', { style: { color: '#00f2fe' } }, `● ${count} Projects Cataloged Across 4 Quadrants`)
    ]);
  }

  static _filterCatalog(state) {
    return this.getCatalog().filter(item => {
      if (state.activeFilter !== 'all' && item.quadrant !== state.activeFilter) return false;
      if (!state.query) return true;
      return `${item.name} ${item.title} ${Object.values(item.tiers).join(' ')}`.toLowerCase().includes(state.query);
    });
  }

  static _generateTierPrompt(state) {
    const filtered = this._filterCatalog(state);
    let out = `# 🏛️ ROB BROWN LIVING OPUS: TIER ${state.activeTier} CONTEXT DOSSIER\n`;
    out += `**Generated:** ${new Date().toISOString()} • **Author & Inventor:** Rob Brown\n`;
    out += `**Scope:** ${state.activeFilter === 'all' ? 'All 4 Quadrants' : 'Quadrant ' + state.activeFilter} (${filtered.length} projects)\n`;
    out += `**Detail Tier:** Tier ${state.activeTier} • Universal Port 8080 Mesh • karmatics Organization\n\n---\n\n`;
    filtered.forEach((item, idx) => {
      out += `## ${idx + 1}. [${item.name}] — ${item.title} (Quadrant ${item.quadrant})\n${item.tiers[state.activeTier]}\n\n`;
    });
    return out + `---\n**Directive for AI Agent:** Ingest the above Tier ${state.activeTier} specifications as ground truth. If deeper code is needed, query the specific file from Tier 3 using the Full File Request Protocol.\n`;
  }

  static getCatalog() {
        return [
          {
            quadrant: 'IV', name: 'Portal', title: 'Public Front Page & Live Summary Engine', color: '#00f2fe', icon: '🌐', url: '../Portal/index.html',
            files: ['Portal/Portal.js', 'Portal/js/PortalData.js', 'Portal/js/PortalSummaryEngine.js', 'Portal/js/PortalModals.js', 'Portal/js/PortalDocContent.js'],
            tiers: {
              0: 'Visitor-ready public front page linking Luno, HomeSetup, Career/CAD, Financial Valuation, Family/Legal Context, and Post-Labor Economics.',
              1: 'Presents clean, non-inflammatory summaries with interactive UITools dialogs, live file-scanning JSON summary generation (summaries.json), SensitiveContextGate protection for deeper family/legal pages, and 1-click AI export keys.',
              2: 'Subsystems:\n• PortalSummaryEngine: Fetches sibling luno.json & *Summaries.js files to compile summaries.json\n• Dual Mode: Custom front-page UI + full DocumentReader view\n• Cross-Link Matrix: Anchors all 6 pillars cleanly.',
              3: 'Key File Pointers in Portal/:\n• Portal/Portal.js\n• Portal/js/PortalData.js\n• Portal/js/PortalSummaryEngine.js\n• Portal/js/PortalModals.js\n• Portal/js/PortalDocContent.js'
            }
          },
          {
            quadrant: 'I', name: 'CadPlan', title: 'Master CAD Specification & 3D Lab', color: '#00f2fe', icon: '📐', url: '../CadPlan/index.html',
            files: ['CadPlan/js/CadPlanMetaContent.js', 'CadPlan/js/AccuCadAuditContent.js', 'CadPlan/js/CadITwinParityContent.js', 'CadPlan/js/CadStudioDemoComponent.js', 'CadPlan/js/curve/UpdateControlPoints.js'],
            tiers: {
              0: 'Rob Brown\'s 30-year proven AccuDraw spatial drafting engine, SmartLine continuous chaining, on-curve cubic Bézier splines, and 4-layer headless kernel.',
              1: 'The living executable master specification for open-source 3D CAD. Bridges CADCraft (pure-Rust AutoCAD clone) with AccuDraw\'s floating kinetic compass, single-stroke 3D plane rotations (T, F, S, V), 50ms chorded tentative snapping, and 4-finger Z-elevation on mobile WebRTC touchpads.',
              2: 'Mathematical Invariants:\n• 3x3 Direction-Cosine Basis (ThreeAxes): X_c, Y_c, Z_c\n• Model-Space Perpendicular Normal: P_proj = Origin + ((P_snap - Origin) · u) * u\n• SmartLine Two-Phase Arcs: Phase 1 (Center dashed circle), Phase 2 (Sweep committing DXF bulge tan(θ/4))\n• On-Curve Spline Relaxation: 8-iteration solver deriving G1 tangents without off-curve handles.',
              3: 'Key File Pointers in CadPlan/:\n• CadPlan/js/CadPlanMetaContent.js\n• CadPlan/js/AccuCadAuditContent.js\n• CadPlan/js/CadITwinParityContent.js\n• CadPlan/js/CadStudioDemoComponent.js\n• CadPlan/js/curve/UpdateControlPoints.js'
            }
          },
          {
            quadrant: 'I', name: 'accuCad', title: 'Unified 3D WebGL Workstation', color: '#00f2fe', icon: '🏛️', url: '../accuCad/index.html',
            files: ['accuCad/js/Main.js', 'accuCad/js/BaseController.js', 'accuCad/js/accudraw/AccuDrawLogic.js', 'accuCad/js/TentativePointHandler.js', 'accuCad/js/CameraOrbitAnimator.js'],
            tiers: {
              0: 'Production 3D CAD workstation with tentative snapping, direction-cosine matrix basis, and PBR clearcoat materials.',
              1: 'Interactive CAD studio implementing Rob Brown\'s complete interaction loop: BaseController event pump, AccuDrawLogic constraint state machine, RoundingUtils3D vector fillets, and Line2 screen-space thick wireframes with motion parallax camera oscillation.',
              2: 'Invariants & Algorithms:\n• GeneratePoint.generate(): Screen pixel unprojection to 3D ray\n• AccuDrawLogic.onMotion(): Smart Focus comparing |lx| vs |ly|\n• TentativePointHandler: 14px screen-space thick pick fallback\n• CameraOrbitAnimator: Monocular motion parallax wiggling eye vector R = ||D|| * 0.045.',
              3: 'Key File Pointers in accuCad/:\n• accuCad/js/Main.js\n• accuCad/js/BaseController.js\n• accuCad/js/accudraw/AccuDrawLogic.js\n• accuCad/js/TentativePointHandler.js\n• accuCad/js/CameraOrbitAnimator.js'
            }
          },
          {
            quadrant: 'I', name: 'accudraw', title: '30-Year Historical Lore & Patents', color: '#00f2fe', icon: '📜', url: '../accudraw/index.html',
            files: ['accudraw/js/AccuDrawArchiveApp.js', 'accudraw/js/AccuDrawData.js', 'accudraw/accudraw3d_page1.html'],
            tiers: {
              0: 'The historical archive of AccuDraw\'s invention at Bentley Systems, US Patent #5,754,182, and MicroStation Manager lore.',
              1: 'Documents the 1994–1996 breakthrough that replaced command-line coordinate typing with a kinetic on-canvas compass and established Bentley Systems\' first issued corporate patent.',
              2: 'Patents & Legal Status:\n• US Patent #5,371,845 (Intergraph, 1994): Dynamic constraint alignment\n• US Patent #5,754,182 (Bentley Systems, Issued 1998): Kinetic floating orientation frame\n• Exclusivity: Expired May 2018; core mathematics are public domain.',
              3: 'Key File Pointers in accudraw/:\n• accudraw/js/AccuDrawArchiveApp.js\n• accudraw/js/AccuDrawData.js\n• accudraw/accudraw3d_page1.html'
            }
          },
          {
            quadrant: 'II', name: 'situation', title: 'Executive Career Dossier, Court Filing & Legal Reality', color: '#ef4444', icon: '⚖️', url: '../situation/index.html',
            files: ['situation/js/SituationApp.js', 'situation/js/OverviewPage.js', 'situation/js/CourtFilingPage.js', 'situation/js/ElderAdvocacyPage.js', 'situation/js/CaretakerBiasPage.js', 'situation/js/ValuationPage.js', 'situation/luno.json'],
            tiers: {
              0: 'Updated Nov 2026 personal dossier: stable living situation, daughter & court filing workspace, gated family/legal pages, and $1.2B–$5.54B+ ($2.3B midpoint) IP valuation.',
              1: 'Personal, professional, and legal dossier tracking November 2026 housing stability, court filing preparation for daughter matters, gated sensitive family/legal chapters (Elder Advocacy, Caretaker Bias, Court Filing), and 4-model AccuDraw valuation.',
              2: 'Attribution & Dossier Structure:\n• Valuation Midpoint: $2.3B across Claude, Gemini, ChatGPT, and Grok ($1.2B–$5.54B+ counterfactual)\n• Court & Daughter Workspace: Living Directives-enabled stability & evidence preparation\n• Protected Chapters: Elder Advocacy, Caretaker Bias, and Court Filing pages gated behind SensitiveContextGate.',
              3: 'Key File Pointers in situation/:\n• situation/js/SituationApp.js\n• situation/js/OverviewPage.js\n• situation/js/CourtFilingPage.js\n• situation/js/ElderAdvocacyPage.js\n• situation/js/CaretakerBiasPage.js\n• situation/js/ValuationPage.js'
            }
          },
          {
            quadrant: 'II', name: 'ValuationOfAccudraw', title: 'Forensic Enterprise Valuation Model', color: '#ef4444', icon: '📊', url: '../ValuationOfAccudraw/index.html',
            files: ['ValuationOfAccudraw/js/ValuationOfAccudraw.js', 'ValuationOfAccudraw/luno.json'],
            tiers: {
              0: 'Quantitative forensic financial model calculating the enterprise value created by AccuDraw for Bentley Systems ($1.2B–$5.54B+).',
              1: 'Valuation modeling based on Bentley Systems corporate financials, subscription renewals, and State DOT software lock-in during the AutoCAD Release 13 era.',
              2: 'Financial Formulae:\n• Churn Reduction Multiple: 45–55% enterprise retention attributed to neuromuscular muscle memory\n• Net Present Value (NPV): Compounded MicroStation recurring licenses (1995–2024)\n• Counterfactual Attribution: $1.2B conservative to $5.54B+ base/unprimed search.',
              3: 'Key File Pointers in ValuationOfAccudraw/:\n• ValuationOfAccudraw/js/ValuationOfAccudraw.js\n• ValuationOfAccudraw/luno.json'
            }
          },
          {
            quadrant: 'III', name: 'EconomicsOfAutomation', title: 'The Robot Dividend & Post-Labor Model', color: '#f59e0b', icon: '🤖', url: '../EconomicsOfAutomation/index.html',
            files: ['EconomicsOfAutomation/js/ArticleContent.js', 'EconomicsOfAutomation/js/ColonyContent.js', 'EconomicsOfAutomation/js/DoomerContent.js', 'EconomicsOfAutomation/js/TaxChartComponent.js'],
            tiers: {
              0: 'First-principles macroeconomic model for human survival through automation: the Colony of 100,000 and the Robot Dividend.',
              1: 'Multi-part economic thesis demonstrating why labor-based income collapses under advanced automation and how distributing machine capital productivity sustains aggregate demand.',
              2: 'Macroeconomic Principles:\n• Decoupling Invariant: Human labor hours decouple from societal production output\n• Colony of 100,000: Thought experiment proving abundance with tangible currency\n• Doomer Loop: Game-theoretic proof that wage collapse destroys demand for capital owners.',
              3: 'Key File Pointers in EconomicsOfAutomation/:\n• EconomicsOfAutomation/js/ArticleContent.js\n• EconomicsOfAutomation/js/ColonyContent.js\n• EconomicsOfAutomation/js/DoomerContent.js\n• EconomicsOfAutomation/js/TaxChartComponent.js'
            }
          },
          {
            quadrant: 'III', name: 'JobsAndAI', title: 'The Automation Horizon Empirical Analysis', color: '#f59e0b', icon: '📈', url: '../JobsAndAI/index.html',
            files: ['JobsAndAI/js/JobsAndAI.js', 'JobsAndAI/js/ThesisPage.js', 'JobsAndAI/js/AiPerspectivePage.js'],
            tiers: {
              0: 'Empirical analysis of generative AI and spatial robotics replacing human labor across cognitive and physical industries.',
              1: 'Examines the accelerating pace of AI code generation, visual synthesis, and automated logistics, demonstrating why universal purchasing power mechanisms are urgent.',
              2: 'Empirical Framework:\n• White-collar displacement curve: Speedup of coding, drafting, and legal review\n• Hardware robotics crossover: Spatial vision + humanoid actuators\n• Tax base erosion: Impossibility of funding governments solely on payroll taxes.',
              3: 'Key File Pointers in JobsAndAI/:\n• JobsAndAI/js/JobsAndAI.js\n• JobsAndAI/js/ThesisPage.js\n• JobsAndAI/js/AiPerspectivePage.js'
            }
          },
          {
            quadrant: 'IV', name: 'HomeSetup', title: 'Multi-Node Fleet & Port 8080 Federation', color: '#10b981', icon: '🖥️', url: '../HomeSetup/index.html',
            files: ['HomeSetup/HomeSetup.js', 'HomeSetup/js/HomeHandoffComponent.js', 'HomeSetup/js/HomeFleetVisualizer.js', 'HomeSetup/js/HomeSummaries.js'],
            tiers: {
              0: 'Multi-node hardware infrastructure: verified Port 8080 federation between Ubuntu Linux (10.0.0.245) and Mac Mini (10.0.0.226).',
              1: 'Documents the physical fleet (Ubuntu laptop, Mac Mini, Windows PC, two mobile phones), roving external drive mount points, zero-leak credential policies, and active handoff ledger.',
              2: 'Network & Port Architecture:\n• Universal Port 8080: Luno HTTP federation (60 workspace projects, 50+ Git repos)\n• Dynamic Subnet Discovery: Auto-detects peer machines on 10.0.0.x\n• Zero-Leak Credentials: Secrets stay in local environment files, never in prompts.',
              3: 'Key File Pointers in HomeSetup/:\n• HomeSetup/HomeSetup.js\n• HomeSetup/js/HomeHandoffComponent.js\n• HomeSetup/js/HomeFleetVisualizer.js\n• HomeSetup/js/HomeSummaries.js'
            }
          },
          {
            quadrant: 'IV', name: 'Luno', title: 'Phone-First Dual-Mode AI Cockpit', color: '#10b981', icon: '🌙', url: '../Luno/index.html',
            files: ['Luno/app/ClientApp.js', 'Luno/app/ClientAppPaster.js', 'Luno/app/OutboxQueue.js', 'Luno/core/LunoClassPatcher.js', 'Luno/app/LunoDeployEngine.js'],
            tiers: {
              0: 'Phone-first development cockpit with zero-token clipboard container protocol and in-browser AST class patcher.',
              1: 'Meta-development environment driving all projects via HTML containers, Outbox bundles, and 1-tap deployment to GitHub Pages.',
              2: 'Protocol & Patching Invariants:\n• HTML Container Protocol: Surgical method updates inside one html fence\n• In-Browser Acorn AST: LunoClassPatcher splices methods cleanly\n• Outbox Queue: Segregates Instructions, Library Code (deduplicated), and Project Code.',
              3: 'Key File Pointers in Luno/:\n• Luno/app/ClientApp.js\n• Luno/app/ClientAppPaster.js\n• Luno/app/OutboxQueue.js\n• Luno/core/LunoClassPatcher.js\n• Luno/app/LunoDeployEngine.js'
            }
          },
          {
            quadrant: 'IV', name: 'Library', title: 'Central Shared Dependency Hub', color: '#10b981', icon: '📚', url: '../Library/index.html',
            files: ['Library/DomBasics.js', 'Library/UITools.js', 'Library/DocumentReader.js', 'Library/CadPlanItemNotes.js', 'Library/CadPlanDocumentEditor.js', 'Library/CadPlanAardvark.js', 'Library/SupabaseCommentsAdapter.js'],
            tiers: {
              0: 'Central shared dependency repository powering all sibling projects without code duplication.',
              1: 'Houses DomBasics, UITools, DocumentReader, CadPlanItemNotes, CadPlanDocumentEditor, CadPlanAardvark, VideoPlayer, and DictationWidget.',
              2: 'Three-Tier Resolution Chain:\n• 1. Local Server: Routes to sibling /Library/ directly\n• 2. User Fork on GitHub Pages: Resolves https://<user>.github.io/Library/\n• 3. Karmatics Root Fallback: Falls back to https://karmatics.github.io/Library/.',
              3: 'Key File Pointers in Library/:\n• Library/DomBasics.js\n• Library/UITools.js\n• Library/DocumentReader.js\n• Library/CadPlanItemNotes.js\n• Library/CadPlanDocumentEditor.js\n• Library/CadPlanAardvark.js'
            }
          },
          {
            quadrant: 'IV', name: 'QuoraToys', title: 'Quora Spatial Annotation & Archival Tools', color: '#c084fc', icon: '🧸', url: '../QuoraToys/index.html',
            files: ['QuoraToys/js/QuoraToys.js', 'QuoraToys/js/QuoraAnnotationComponent.js', 'QuoraToys/js/QuoraStudioComponent.js', 'QuoraToys/luno.json'],
            tiers: {
              0: 'In-situ bookmarklet, Chrome extension, and archival suite for rich canvas annotations and thread capturing on Quora.',
              1: 'Combines an in-situ drawing/annotation overlay, spot-the-difference studio, and structured answer archiver for publishing and cross-linking essays.',
              2: 'Key Subsystems:\n• Bookmarklet & Extension: AardvarkActions + in-situ overlay\n• Vector Annotation: DrawingApp integration\n• Answer Archiver: Local & portable export pipeline.',
              3: 'Key File Pointers in QuoraToys/:\n• QuoraToys/js/QuoraToys.js\n• QuoraToys/js/QuoraAnnotationComponent.js\n• QuoraToys/js/QuoraStudioComponent.js'
            }
          }
        ];
      }
  static resolveAppUrl(projectName, hash = '') {
      if (!projectName) return '#';
      const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
      if (typeof window !== 'undefined' && window.location) {
        const host = window.location.hostname || '';
        if (host.endsWith('.github.io')) {
          const user = host.split('.')[0] || 'karmatics';
          return `https://${user}.github.io/${projectName}/index.html${cleanHash}`;
        }
        if (window.location.protocol === 'about:') {
          try {
            const pHost = window.parent?.location?.hostname || '';
            if (pHost.endsWith('.github.io')) {
              return `https://${pHost.split('.')[0] || 'karmatics'}.github.io/${projectName}/index.html${cleanHash}`;
            }
            if (window.parent?.location?.origin && window.parent.location.origin !== 'null') {
              return `${window.parent.location.origin}/${projectName}/index.html${cleanHash}`;
            }
          } catch (e) {}
          return `https://karmatics.github.io/${projectName}/index.html${cleanHash}`;
        }
      }
      return `../${projectName}/index.html${cleanHash}`;
    }
}

globalThis.OpusRouterComponent = OpusRouterComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusRouterComponent;