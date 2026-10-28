class OpusRouterComponent {

  static render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace'
      }
    });

    const header = makeElement('div', {
      style: {
        padding: '12px 16px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
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
    wrap.appendChild(header);

    const tierStrip = makeElement('div', {
      style: {
        padding: '8px 16px',
        background: '#090d16',
        borderBottom: '1px solid #161e2b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontSize: '11px'
      }
    });

    let btnT0, btnT1, btnT2, btnT3;
    const tierGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
      makeElement('span', { style: { color: '#64748b', fontWeight: 'bold' } }, 'Detail Level:'),
      btnT0 = makeElement('button', { className: 'dr-tab-btn', onclick: () => setTier(0) }, 'Tier 0: Synopsis (~250 tkn)'),
      btnT1 = makeElement('button', { className: 'dr-tab-btn active', onclick: () => setTier(1) }, 'Tier 1: Deep Spec (~1.2k tkn)'),
      btnT2 = makeElement('button', { className: 'dr-tab-btn', onclick: () => setTier(2) }, 'Tier 2: Math & Invariants (~2.5k tkn)'),
      btnT3 = makeElement('button', { className: 'dr-tab-btn', onclick: () => setTier(3) }, 'Tier 3: File Pointers')
    ]);

    const actionGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
      makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: 'bold' },
        onclick: () => copySelectedTierPrompt()
      }, '📋 Copy Tier Prompt'),
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '4px 10px', fontSize: '10.5px', color: '#d2a8ff', borderColor: '#8257e5' },
        onclick: () => pushSelectedTierToOutbox()
      }, '📤 Push to Outbox')
    ]);

    tierStrip.appendChild(tierGroup);
    tierStrip.appendChild(actionGroup);
    wrap.appendChild(tierStrip);

    // Quick File Fetcher Toolbar
    const fetchBar = makeElement('div', {
      style: {
        padding: '8px 16px',
        background: '#070a13',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }
    });

    const fetchInput = makeElement('input', {
      type: 'text',
      placeholder: '⚡ Pull any file from repo (e.g. Library/DocumentReader.js, HomeSetup/js/CadPlanItemNotes.js)...',
      style: {
        flex: '1 1 300px',
        background: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '5px',
        padding: '5px 10px',
        color: '#00f2fe',
        fontSize: '11px',
        fontFamily: 'monospace',
        outline: 'none'
      }
    });
    fetchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && fetchInput.value.trim()) {
        OpusRouterComponent.openFileViewer(fetchInput.value.trim());
      }
    });

    const btnFetch = makeElement('button', {
      className: 'dr-nav-btn',
      style: { padding: '4px 12px', fontSize: '10.5px', color: '#00f2fe', borderColor: '#00f2fe', fontWeight: 'bold' },
      onclick: () => {
        const p = fetchInput.value.trim();
        if (p) OpusRouterComponent.openFileViewer(p);
        else alert('Please enter a valid file path up to workspace root.');
      }
    }, '⚡ Fetch File');

    fetchBar.appendChild(fetchInput);
    fetchBar.appendChild(btnFetch);
    wrap.appendChild(fetchBar);

    const searchBar = makeElement('div', {
      style: {
        padding: '10px 16px',
        background: '#0d1117',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }
    });

    const searchInput = makeElement('input', {
      type: 'text',
      placeholder: '🔍 Search projects, patents, models (e.g. AccuDraw, 1.2B, Falsifiability, Port 8080)...',
      style: {
        flex: '1 1 260px',
        background: '#070a13',
        border: '1px solid #30363d',
        borderRadius: '6px',
        padding: '6px 10px',
        color: '#00f2fe',
        fontSize: '11px',
        fontFamily: 'monospace',
        outline: 'none'
      }
    });

    const qFilters = makeElement('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } });
    const filterDefs = [
      { id: 'all', label: 'All Quadrants' },
      { id: 'I', label: 'Q-I: CAD Inventions', col: '#00f2fe' },
      { id: 'II', label: 'Q-II: Narrative & Valuation', col: '#ef4444' },
      { id: 'III', label: 'Q-III: Post-Labor Economics', col: '#f59e0b' },
      { id: 'IV', label: 'Q-IV: Fleet & Cockpit', col: '#10b981' }
    ];

    let activeFilter = 'all';
    let activeTier = 1;

    filterDefs.forEach(f => {
      const btn = makeElement('button', {
        className: `dr-tab-btn ${f.id === 'all' ? 'active' : ''}`,
        style: { padding: '3px 8px', fontSize: '10.5px' },
        onclick: () => {
          activeFilter = f.id;
          qFilters.querySelectorAll('.dr-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderCards();
        }
      }, f.label);
      qFilters.appendChild(btn);
    });

    searchBar.appendChild(searchInput);
    searchBar.appendChild(qFilters);
    wrap.appendChild(searchBar);

    const cardsGrid = makeElement('div', {
      id: 'opus-dossier-grid',
      style: {
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '12px',
        background: '#090d16',
        maxHeight: '520px',
        overflowY: 'auto'
      }
    });
    wrap.appendChild(cardsGrid);

    const catalog = [
      {
        quadrant: 'I',
        name: 'CadPlan',
        title: 'Master CAD Specification & 3D Lab',
        color: '#00f2fe',
        icon: '📐',
        url: '../CadPlan/index.html',
        files: [
          'CadPlan/js/CadPlanMetaContent.js',
          'CadPlan/js/AccuCadAuditContent.js',
          'CadPlan/js/CadITwinParityContent.js',
          'CadPlan/js/CadStudioDemoComponent.js',
          'CadPlan/js/curve/UpdateControlPoints.js'
        ],
        tiers: {
          0: 'Rob Brown\'s 30-year proven AccuDraw spatial drafting engine, SmartLine continuous chaining, on-curve cubic Bézier splines, and 4-layer headless kernel.',
          1: 'The living executable master specification for open-source 3D CAD. Bridges CADCraft (pure-Rust AutoCAD clone) with AccuDraw\'s floating kinetic compass, single-stroke 3D plane rotations (T, F, S, V), 50ms chorded tentative snapping, and 4-finger Z-elevation on mobile WebRTC touchpads.',
          2: 'Mathematical Invariants:\n• 3x3 Direction-Cosine Basis (ThreeAxes): X_c, Y_c, Z_c\n• Model-Space Perpendicular Normal: P_proj = Origin + ((P_snap - Origin) · u) * u\n• SmartLine Two-Phase Arcs: Phase 1 (Center with dashed circle R = ||C - P0||), Phase 2 (Sweep committing DXF bulge tan(θ/4))\n• On-Curve Spline Relaxation: 8-iteration solver deriving G1 tangents through through-points without off-curve handles.',
          3: 'Key File Pointers in CadPlan/:\n• CadPlan/js/CadPlanMetaContent.js\n• CadPlan/js/AccuCadAuditContent.js\n• CadPlan/js/CadITwinParityContent.js\n• CadPlan/js/CadStudioDemoComponent.js\n• CadPlan/js/curve/UpdateControlPoints.js'
        }
      },
      {
        quadrant: 'I',
        name: 'accuCad',
        title: 'Unified 3D WebGL Workstation',
        color: '#00f2fe',
        icon: '🏛️',
        url: '../accuCad/index.html',
        files: [
          'accuCad/js/Main.js',
          'accuCad/js/BaseController.js',
          'accuCad/js/accudraw/AccuDrawLogic.js',
          'accuCad/js/TentativePointHandler.js',
          'accuCad/js/CameraOrbitAnimator.js'
        ],
        tiers: {
          0: 'Production 3D CAD workstation with tentative snapping, direction-cosine matrix basis, and PBR clearcoat materials.',
          1: 'Interactive CAD studio implementing Rob Brown\'s complete interaction loop: BaseController event pump, AccuDrawLogic constraint state machine, RoundingUtils3D vector fillets, and Line2 screen-space thick wireframes with motion parallax camera oscillation.',
          2: 'Invariants & Algorithms:\n• GeneratePoint.generate(): Screen pixel unprojection to 3D ray\n• AccuDrawLogic.onMotion(): Smart Focus comparing |lx| vs |ly|\n• TentativePointHandler: 14px screen-space thick pick fallback\n• CameraOrbitAnimator: Monocular motion parallax wiggling eye vector on perpendicular disc R = ||D|| * 0.045.',
          3: 'Key File Pointers in accuCad/:\n• accuCad/js/Main.js\n• accuCad/js/BaseController.js\n• accuCad/js/accudraw/AccuDrawLogic.js\n• accuCad/js/TentativePointHandler.js\n• accuCad/js/CameraOrbitAnimator.js'
        }
      },
      {
        quadrant: 'I',
        name: 'accudraw',
        title: '30-Year Historical Lore & Patents',
        color: '#00f2fe',
        icon: '📜',
        url: '../accudraw/index.html',
        files: [
          'accudraw/js/AccuDrawArchiveApp.js',
          'accudraw/js/AccuDrawData.js',
          'accudraw/accudraw3d_page1.html'
        ],
        tiers: {
          0: 'The historical archive of AccuDraw\'s invention at Bentley Systems, US Patent #5,754,182, and MicroStation Manager lore.',
          1: 'Documents the 1994–1996 breakthrough that replaced command-line coordinate typing with a kinetic on-canvas compass. Explains the engineering workaround around US Patent #5,371,845 that gave Bentley Systems clean sole-inventor intellectual property for its first issued patent.',
          2: 'Patents & Legal Status:\n• US Patent #5,371,845 (Intergraph, Filed 1992, Issued 1994): Dynamic constraint alignment\n• US Patent #5,754,182 (Bentley Systems, Filed 1995, Issued 1998): Kinetic floating orientation frame\n• Exclusivity: 20-year statutory terms expired May 2018; core mathematics are public domain.',
          3: 'Key File Pointers in accudraw/:\n• accudraw/js/AccuDrawArchiveApp.js\n• accudraw/js/AccuDrawData.js\n• accudraw/accudraw3d_page1.html'
        }
      },
      {
        quadrant: 'II',
        name: 'situation',
        title: 'Executive Career Dossier & Legal Reality',
        color: '#ef4444',
        icon: '⚖️',
        url: '../situation/index.html',
        files: [
          'situation/js/SituationApp.js',
          'situation/js/OverviewPage.js',
          'situation/js/ElderAdvocacyPage.js',
          'situation/js/AccuDrawValuation.js'
        ],
        tiers: {
          0: 'Forensic documentation contrasting the billions created by Rob Brown\'s software with his current life on food stamps, verified by unprimed Google Search.',
          1: 'The comprehensive personal, professional, and legal dossier. Details caretaker bias during years of elder advocacy, inheritance disputes, financial distress, and daughter custody estrangement. Fully verified by neutral public Google Search linking unprimed prompts directly to Rob Brown and $1.2B–$3.6B in counterfactual enterprise value.',
          2: 'Attribution & Valuation Metrics:\n• Market Cap Impact: $1.2B to $3.6B of Bentley Systems enterprise valuation (~$12B)\n• The Falsifiability Test: Proves that neutral, unprimed search prompts cannot replicate this valuation for any ordinary, non-famous individual\n• State DOT Dominance: 48 out of 50 U.S. State Departments of Transportation locked into MicroStation via AccuDraw workflows\n• Legal Precedent: Forensic IP valuation standards and parental alienation timeline.',
          3: 'Key File Pointers in situation/:\n• situation/js/SituationApp.js\n• situation/js/OverviewPage.js\n• situation/js/ElderAdvocacyPage.js\n• situation/js/AccuDrawValuation.js'
        }
      },
      {
        quadrant: 'II',
        name: 'ValuationOfAccudraw',
        title: 'Forensic Enterprise Valuation Model',
        color: '#ef4444',
        icon: '📊',
        url: '../ValuationOfAccudraw/index.html',
        files: [
          'ValuationOfAccudraw/js/ValuationOfAccudraw.js',
          'ValuationOfAccudraw/luno.json'
        ],
        tiers: {
          0: 'Quantitative forensic financial model calculating the enterprise value created by AccuDraw for Bentley Systems.',
          1: 'Rigorous valuation modeling based on Bentley Systems corporate financials, subscription renewals, and DOT software lock-in. Proves how AccuDraw served as the critical anti-churn moat during the AutoCAD Release 13 era, matching Google Search\'s independent $1.2B–$3.6B estimate.',
          2: 'Financial Formulae:\n• Churn Reduction Multiple: 45–55% enterprise retention attributed to neuromuscular muscle memory\n• Net Present Value (NPV): Compounded valuation of recurring MicroStation and PowerDraft licenses from 1995 to 2024\n• Acquisition Avoidance: Quantifies the existential survival value during Autodesk\'s aggressive expansion.',
          3: 'Key File Pointers in ValuationOfAccudraw/:\n• ValuationOfAccudraw/js/ValuationOfAccudraw.js\n• ValuationOfAccudraw/luno.json'
        }
      },
      {
        quadrant: 'III',
        name: 'EconomicsOfAutomation',
        title: 'The Robot Dividend & Post-Labor Model',
        color: '#f59e0b',
        icon: '🤖',
        url: '../EconomicsOfAutomation/index.html',
        files: [
          'EconomicsOfAutomation/js/ArticleContent.js',
          'EconomicsOfAutomation/js/ColonyContent.js',
          'EconomicsOfAutomation/js/DoomerContent.js',
          'EconomicsOfAutomation/js/TaxChartComponent.js'
        ],
        tiers: {
          0: 'First-principles macroeconomic model for human survival through automation: the Colony of 100,000 and the Robot Dividend.',
          1: 'A multi-part economic thesis demonstrating why traditional labor-based income collapses under advanced automation, and how society can smoothly transition by distributing the capital productivity of automated machines directly to citizens as a dividend.',
          2: 'Macroeconomic Principles:\n• The Decoupling Invariant: When robots produce food and shelter, human labor hours decouple from societal abundance\n• The Colony of 100,000: Thought experiment showing that automation should eliminate poverty, not cause starvation\n• The Doomer Loop: Game-theoretic proof that shrinking consumer wages destroys aggregate demand for automated capital owners.',
          3: 'Key File Pointers in EconomicsOfAutomation/:\n• EconomicsOfAutomation/js/ArticleContent.js\n• EconomicsOfAutomation/js/ColonyContent.js\n• EconomicsOfAutomation/js/DoomerContent.js\n• EconomicsOfAutomation/js/TaxChartComponent.js'
        }
      },
      {
        quadrant: 'III',
        name: 'JobsAndAI',
        title: 'The Automation Horizon Empirical Analysis',
        color: '#f59e0b',
        icon: '📈',
        url: '../JobsAndAI/index.html',
        files: [
          'JobsAndAI/js/JobsAndAI.js',
          'JobsAndAI/js/ThesisPage.js',
          'JobsAndAI/js/AiPerspectivePage.js'
        ],
        tiers: {
          0: 'Empirical analysis of generative AI and spatial robotics replacing human labor across cognitive and physical industries.',
          1: 'Examines the accelerating pace of AI code generation, visual synthesis, and automated logistics, demonstrating why universal purchasing power mechanisms are urgent macroeconomic requirements.',
          2: 'Empirical Framework:\n• White-collar displacement curve: Exponential speedup of coding, drafting, and legal review\n• Hardware robotics crossover: The convergence of spatial vision and humanoid actuators\n• Tax base erosion: The arithmetic impossibility of funding governments purely on human payroll taxes.',
          3: 'Key File Pointers in JobsAndAI/:\n• JobsAndAI/js/JobsAndAI.js\n• JobsAndAI/js/ThesisPage.js\n• JobsAndAI/js/AiPerspectivePage.js'
        }
      },
      {
        quadrant: 'IV',
        name: 'HomeSetup',
        title: 'Multi-Node Fleet & Port 8080 Federation',
        color: '#10b981',
        icon: '🖥️',
        url: '../HomeSetup/index.html',
        files: [
          'HomeSetup/HomeSetup.js',
          'HomeSetup/js/CadPlanItemNotes.js',
          'HomeSetup/js/CadPlanAardvark.js',
          'HomeSetup/js/HomeHandoffComponent.js',
          'HomeSetup/js/HomeFleetVisualizer.js'
        ],
        tiers: {
          0: 'Multi-node hardware infrastructure: verified Port 8080 federation between Ubuntu Linux (10.0.0.245) and Mac (10.0.0.226).',
          1: 'Documents the physical fleet (Ubuntu laptop, Mac workstation, Windows PC, two mobile phones), roving external drive mount points, zero-leak credential policies, and the active session handoff ledger.',
          2: 'Network & Port Architecture:\n• Universal Port 8080: Luno HTTP federation eliminating legacy port 3000 remnants\n• Dynamic Subnet Discovery: Auto-detects peer machines on 10.0.0.x without static IP assumptions\n• Zero-Leak Credentials: Passwords stored in ~/.config/secrets/ and read locally at runtime, never passed into LLM prompts.',
          3: 'Key File Pointers in HomeSetup/:\n• HomeSetup/HomeSetup.js\n• HomeSetup/js/CadPlanItemNotes.js\n• HomeSetup/js/CadPlanAardvark.js\n• HomeSetup/js/HomeHandoffComponent.js\n• HomeSetup/js/HomeFleetVisualizer.js'
        }
      },
      {
        quadrant: 'IV',
        name: 'Luno',
        title: 'Phone-First Dual-Mode AI Cockpit',
        color: '#10b981',
        icon: '🌙',
        url: '../Luno/index.html',
        files: [
          'Luno/app/ClientApp.js',
          'Luno/app/ClientAppPaster.js',
          'Luno/app/OutboxQueue.js',
          'Luno/core/LunoClassPatcher.js',
          'Luno/app/LunoDeployEngine.js'
        ],
        tiers: {
          0: 'Phone-first development cockpit with zero-token clipboard container protocol and in-browser AST class patcher.',
          1: 'The meta-development environment driving all projects. Uses HTML containers (<script data-method="...">) to splice class methods in memory, queues prompt bundles in Outbox, and provides 1-tap deployment to GitHub Pages.',
          2: 'Protocol & Patching Invariants:\n• HTML Container Protocol: Parse and stream surgical method updates in a single html code fence\n• In-Browser Acorn AST: LunoClassPatcher parses and splices methods with zero syntax errors\n• Outbox Queue: Segregates Instructions, Library Code (deduplicated), and Project Code into distinct packages.',
          3: 'Key File Pointers in Luno/:\n• Luno/app/ClientApp.js\n• Luno/app/ClientAppPaster.js\n• Luno/app/OutboxQueue.js\n• Luno/core/LunoClassPatcher.js\n• Luno/app/LunoDeployEngine.js'
        }
      },
      {
        quadrant: 'IV',
        name: 'Library',
        title: 'Central Shared Dependency Hub',
        color: '#10b981',
        icon: '📚',
        url: '../Library/index.html',
        files: [
          'Library/DomBasics.js',
          'Library/UITools.js',
          'Library/DocumentReader.js',
          'Library/SupabaseCommentsAdapter.js',
          'Library/LunoLoader.js'
        ],
        tiers: {
          0: 'Central shared dependency repository powering all sibling projects without code duplication.',
          1: 'Houses DomBasics, UITools (draggable/resizable dialogs), DocumentReader, ThreeJSLoader (universal PBR lighting), VideoPlayer (YouTube loops), and DictationWidget (speech-to-text).',
          2: 'Three-Tier Resolution Chain:\n• 1. Local Server: Routes to sibling /Library/ directly\n• 2. User Fork on GitHub Pages: Resolves https://<user>.github.io/Library/\n• 3. Karmatics Root Fallback: Automatically falls back to https://karmatics.github.io/Library/ if un-forked, ensuring zero 404 broken sites.',
          3: 'Key File Pointers in Library/:\n• Library/DomBasics.js\n• Library/UITools.js\n• Library/DocumentReader.js\n• Library/SupabaseCommentsAdapter.js\n• Library/LunoLoader.js'
        }
      }
    ];

    function setTier(tierNum) {
      activeTier = tierNum;
      [btnT0, btnT1, btnT2, btnT3].forEach((b, idx) => b.classList.toggle('active', idx === tierNum));

      const budgets = ['~250 tokens (Tier 0)', '~1,200 tokens (Tier 1)', '~2,500 tokens (Tier 2)', 'Interactive File Pointers (Tier 3)'];
      const pill = document.getElementById('opus-budget-pill');
      if (pill) {
        pill.textContent = `Token Budget: ${budgets[tierNum]}`;
      }
      renderCards();
    }

    function renderCards() {
      cardsGrid.innerHTML = '';
      const q = searchInput.value.toLowerCase().trim();

      const filtered = catalog.filter(item => {
        if (activeFilter !== 'all' && item.quadrant !== activeFilter) return false;
        if (!q) return true;
        const text = `${item.name} ${item.title} ${Object.values(item.tiers).join(' ')}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        cardsGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 32px; text-align: center; color: #64748b; font-style: italic;">No projects matched your search.</div>';
        return;
      }

      filtered.forEach(item => {
        const card = makeElement('div', {
          style: {
            background: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${item.color}33`,
            borderLeft: `4px solid ${item.color}`,
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px'
          }
        });

        const topRow = makeElement('div', {
          style: { display: 'flex', justifyContext: 'space-between', alignItems: 'flex-start', gap: '8px' }
        }, [
          makeElement('div', {}, [
            makeElement('span', { style: { fontSize: '10px', color: item.color, fontWeight: 'bold' } }, `QUADRANT ${item.quadrant} • `),
            makeElement('strong', { style: { color: '#f8fafc', fontSize: '13px' } }, `${item.icon} ${item.name}`),
            makeElement('div', { style: { color: item.color, fontSize: '10.5px', marginTop: '1px' } }, item.title)
          ]),
          makeElement('span', {
            style: { fontSize: '9px', background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}44`, padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' }
          }, `Q-${item.quadrant}`)
        ]);
        card.appendChild(topRow);

        if (activeTier === 3 && item.files && item.files.length) {
          // Render interactive file pointer buttons
          const filesContainer = makeElement('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              background: '#070a13',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              padding: '8px',
              maxHeight: '160px',
              overflowY: 'auto'
            }
          });

          item.files.forEach(fPath => {
            const fileRow = makeElement('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '3px 6px',
                borderRadius: '4px',
                background: '#0a0e1a',
                border: '1px solid #161e2b'
              }
            }, [
              makeElement('span', {
                style: { fontSize: '10.5px', color: '#38bdf8', fontFamily: 'monospace', wordBreak: 'break-all' }
              }, fPath),
              makeElement('button', {
                className: 'dr-nav-btn',
                style: { padding: '2px 6px', fontSize: '9px', color: '#00f2fe' },
                onclick: () => OpusRouterComponent.openFileViewer(fPath)
              }, '⚡ Fetch')
            ]);
            filesContainer.appendChild(fileRow);
          });
          card.appendChild(filesContainer);
        } else {
          const bodyContent = makeElement('pre', {
            style: {
              margin: '0',
              padding: '8px',
              background: '#070a13',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              fontSize: '10.5px',
              color: activeTier === 2 ? '#10b981' : '#cbd5e1',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'monospace',
              maxHeight: '160px',
              overflowY: 'auto',
              lineHeight: '1.45'
            }
          }, item.tiers[activeTier] || item.tiers[0]);
          card.appendChild(bodyContent);
        }

        const footerRow = makeElement('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '6px', borderTop: '1px solid #161e2b', gap: '6px', flexWrap: 'wrap'
          }
        }, [
          makeElement('a', {
            href: item.url,
            target: '_blank',
            style: { color: '#38bdf8', textDecoration: 'none', fontSize: '10.5px', fontWeight: 'bold' }
          }, '↗ Open Tab'),
          makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
            makeElement('button', {
              className: 'dr-nav-btn',
              style: { padding: '2px 7px', fontSize: '9.5px' },
              onclick: () => {
                if (typeof ClientApp !== 'undefined' && typeof ClientApp.switchExclusiveTargetProject === 'function') {
                  ClientApp.switchExclusiveTargetProject(item.name);
                } else if (typeof ClientApp !== 'undefined' && ClientApp.setTargetProject) {
                  ClientApp.setTargetProject(item.name, { openTab: true });
                }
              }
            }, '🎯 Target in Luno'),
            makeElement('button', {
              className: 'dr-nav-btn',
              style: { padding: '2px 7px', fontSize: '9.5px', color: '#00f2fe' },
              onclick: () => {
                const text = `# DOSSIER FOCUS: [${item.name}] - ${item.title}\nQuadrant: ${item.quadrant}\nTier ${activeTier} Detail:\n${item.tiers[activeTier]}\n`;
                navigator.clipboard.writeText(text).then(() => alert(`✓ Copied Tier ${activeTier} context for [${item.name}]!`));
              }
            }, '📋 Copy Tier')
          ])
        ]);
        card.appendChild(footerRow);

        cardsGrid.appendChild(card);
      });
    }

    function generateFullTierPrompt() {
      const q = searchInput.value.toLowerCase().trim();
      const filtered = catalog.filter(item => {
        if (activeFilter !== 'all' && item.quadrant !== activeFilter) return false;
        if (!q) return true;
        const text = `${item.name} ${item.title} ${Object.values(item.tiers).join(' ')}`.toLowerCase();
        return text.includes(q);
      });

      let out = `# 🏛️ ROB BROWN LIVING OPUS: TIER ${activeTier} CONTEXT DOSSIER\n`;
      out += `**Generated:** ${new Date().toISOString()} • **Author & Inventor:** Rob Brown\n`;
      out += `**Scope:** ${activeFilter === 'all' ? 'All 4 Quadrants' : 'Quadrant ' + activeFilter} (${filtered.length} projects)\n`;
      out += `**Detail Tier:** Tier ${activeTier} • Universal Port 8080 Mesh • karmatics Organization\n\n---\n\n`;

      filtered.forEach((item, idx) => {
        out += `## ${idx + 1}. [${item.name}] — ${item.title} (Quadrant ${item.quadrant})\n`;
        out += `${item.tiers[activeTier]}\n\n`;
      });

      out += `---\n**Directive for AI Agent:** Ingest the above Tier ${activeTier} specifications as ground truth. Never hallucinate mathematical conventions or setup paths. If deeper code is needed, query the specific file from Tier 3 using the Full File Request Protocol.\n`;
      return out;
    }

    function copySelectedTierPrompt() {
      const text = generateFullTierPrompt();
      navigator.clipboard.writeText(text).then(() => {
        alert(`✓ Copied Tier ${activeTier} prompt bundle to clipboard!`);
      });
    }

    function pushSelectedTierToOutbox() {
      const text = generateFullTierPrompt();
      if (typeof OutboxQueue !== 'undefined' && OutboxQueue.addBundle) {
        OutboxQueue.addBundle(`Opus Tier ${activeTier} Prompt Bundle`, text, { priority: 'high' });
        alert(`✓ Pushed Tier ${activeTier} bundle to Luno Outbox!`);
      } else {
        copySelectedTierPrompt();
      }
    }

    searchInput.oninput = () => renderCards();
    renderCards();

    const footer = makeElement('div', {
      style: {
        padding: '10px 16px',
        background: '#0a0e1a',
        borderTop: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: '#8b949e',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('span', {}, '💡 Click any file in Tier 3 or use the quick fetch bar to stage context without LLM token waste.'),
      makeElement('span', { style: { color: '#00f2fe' } }, '● 10 Projects Cataloged Across 4 Quadrants')
    ]);
    wrap.appendChild(footer);

    container.appendChild(wrap);
  }

  static async openFileViewer(filePath) {
    const cleanPath = filePath.trim().replace(/^\/+/, '');
    const url = cleanPath.startsWith('http') ? cleanPath : '/' + cleanPath;

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
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }
    });

    const dialog = makeElement('div', {
      style: {
        width: '900px',
        maxWidth: '96vw',
        maxHeight: '90vh',
        background: '#070a13',
        border: '1.5px solid #00f2fe',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,242,254,0.2)',
        fontFamily: 'monospace',
        overflow: 'hidden'
      }
    });

    const lines = errorMsg ? 0 : content.split('\n').length;
    const chars = errorMsg ? 0 : content.length;

    const titleBar = makeElement('div', {
      style: {
        padding: '10px 16px',
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '⚡'),
        makeElement('strong', { style: { color: '#00f2fe', fontSize: '12px' } }, cleanPath),
        makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, `(${lines} lines, ${chars} chars)`)
      ]),
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '2px 8px', fontSize: '11px' },
        onclick: () => document.body.removeChild(overlay)
      }, '✕ Close')
    ]);
    dialog.appendChild(titleBar);

    const codeArea = makeElement('pre', {
      style: {
        flex: '1',
        margin: '0',
        padding: '14px',
        background: '#020408',
        color: errorMsg ? '#ef4444' : '#e2e8f0',
        fontSize: '11px',
        lineHeight: '1.5',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        userSelect: 'text'
      }
    }, errorMsg || content);
    dialog.appendChild(codeArea);

    const actions = makeElement('div', {
      style: {
        padding: '10px 16px',
        background: '#090d16',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('span', { style: { fontSize: '10.5px', color: '#94a3b8' } }, 'Accumulative Outbox Staging Active'),
      makeElement('div', { style: { display: 'flex', gap: '8px' } }, [
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '5px 12px', fontSize: '11px' },
          onclick: () => {
            if (errorMsg) return alert('Cannot copy file due to error.');
            const bundle = `<script data-file="${cleanPath}">\n${content}\n<\/script>`;
            navigator.clipboard.writeText(bundle).then(() => alert(`✓ Copied single container for [${cleanPath}] to clipboard!`));
          }
        }, '📋 Copy Single File'),
        makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '5px 14px', fontSize: '11px', fontWeight: 'bold', background: '#0284c7', borderColor: '#38bdf8', color: '#fff' },
          onclick: () => {
            if (errorMsg) return alert('Cannot stage file due to error.');
            if (typeof OutboxQueue !== 'undefined') {
              OutboxQueue.addItem(`File: ${cleanPath}`, content, {
                type: 'file',
                meta: { filePath: cleanPath, lines, chars }
              });
              const count = OutboxQueue.getCount();
              alert(`✓ Staged [${cleanPath}] into Outbox!\n(${count} item${count === 1 ? '' : 's'} now in queue)`);
            } else {
              alert('OutboxQueue not active in this session.');
            }
          }
        }, '📤 Stage into Outbox Queue')
      ])
    ]);
    dialog.appendChild(actions);

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
}

globalThis.OpusRouterComponent = OpusRouterComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusRouterComponent;