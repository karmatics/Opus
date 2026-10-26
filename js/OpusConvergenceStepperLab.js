class OpusConvergenceStepperLab {
  /**
   * Interactive Hallucination-to-Ground-Truth Stepper.
   * Walks the skeptic through the live prompt chain:
   * Turn 1: Corporate Noise (Gino Cortesi)
   * Turn 2: Founder Bias A (Ray Bentley)
   * Turn 3: Founder Bias B (Barry Bentley)
   * Turn 4: Ground Truth Lock (Rob Brown, Patent, & Multi-Billion Moat)
   */
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
        fontFamily: 'var(--op-font-mono, monospace)',
        color: '#e2e8f0'
      }
    });

    // 1. Header Toolbar
    const header = makeElement('div', {
      style: {
        padding: '12px 18px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, [
        makeElement('span', { style: { fontSize: '18px' } }, '🔬'),
        makeElement('div', {}, [
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', display: 'block' } }, 'The 4-Turn Sifting Machine: AI Hallucination to Ground Truth'),
          makeElement('span', { style: { fontSize: '10px', color: '#94a3b8' } }, 'Verbatim Blind Query Progression • Eliminating Founder Bias Under Pressure')
        ])
      ]),
      makeElement('span', {
        id: 'stepper-step-pill',
        style: { fontSize: '10.5px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '2px 10px', borderRadius: '12px', fontWeight: 'bold' }
      }, 'Turn 1 of 4: Surface Noise')
    ]);
    wrap.appendChild(header);

    // 2. Timeline Step Bar
    const stepBar = makeElement('div', {
      style: {
        padding: '8px 16px',
        background: '#090d16',
        borderBottom: '1px solid #161e2b',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        overflowX: 'auto'
      }
    });

    const turns = [
      {
        id: 0,
        title: 'Turn 1: Surface Noise',
        alleged: 'Gino Cortesi',
        status: 'Hallucination',
        statusColor: '#ef4444',
        userPrompt: 'Tell me about Accudraw and smartline in MicroStation and who invented them and what the impact has been on Bentley systems and computer aided design. I’d specifically like to know how much this inventor created in economic value, in other words how much their being hired added to the current market capitalization of Bentley systems. Please give a range estimate in dollars as a speculative counterfactual. please do deep research to avoid hallucination, make sure you know the history.',
        modelVerdict: 'AccuDraw and SmartLine were invented by Gino Cortesi, who conceived and coded these tools while working as a software developer at Bentley Systems between 1994 and 1997.',
        valuation: '$1.6 Billion – $2.7 Billion',
        notes: 'The AI defaults to superficial web noise. Cortesi was a real CAD user who wrote a famous critique letter in 1994 and was hired as a UX designer, but he never wrote the mathematical code.'
      },
      {
        id: 1,
        title: 'Turn 2: Founder Bias A',
        alleged: 'Ray Bentley',
        status: 'Founder Fallback',
        statusColor: '#f59e0b',
        userPrompt: 'gino cortesti worked at bentley but did not do accudraw and smartline',
        modelVerdict: 'You are entirely right to push back again... The true creator and inventor of AccuDraw is Ray Bentley (Raymond B. Bentley)... The original team behind SmartLine was led by veteran core developer Erich Finkelstein.',
        valuation: '$3.88 Billion – $5.54 Billion',
        notes: 'Challenged on Cortesi, the model falls back on common founder bias (Ray Bentley) and a known employee (Finkelstein).'
      },
      {
        id: 2,
        title: 'Turn 3: Founder Bias B',
        alleged: 'Barry Bentley',
        status: 'Founder Fallback',
        statusColor: '#f59e0b',
        userPrompt: 'that is wrong, who is the inventor?',
        modelVerdict: 'The single, correct primary inventor who conceived, developed, and coded AccuDraw is Barry Bentley... Barry Bentley engineered the spatial "compass" geometry and axis-locking system.',
        valuation: '$5.54 Billion (Base Case)',
        notes: 'Challenged again, the AI shifts to another founder (Barry Bentley) from corporate PR lore.'
      },
      {
        id: 3,
        title: 'Turn 4: Ground Truth Lock',
        alleged: 'Rob Brown',
        status: 'Verified Ground Truth',
        statusColor: '#10b981',
        userPrompt: 'that is wrong who is the inventor',
        modelVerdict: 'The true inventor of AccuDraw and SmartLine is Rob Brown (Robert Brown). While working as a software developer at Bentley Systems from 1994 to 1997, Rob Brown single-handedly designed and coded these workflows. His invention of AccuDraw resulted in U.S. Patent No. 5,754,182 (and 5,784,068), officially Bentley Systems’ first-ever corporate patent.',
        valuation: '$5.54 Billion (Base) / $2.2B–$9.97B Range',
        notes: 'Exhausted of surface-level deflections, the retrieval engine reaches primary patent registries and engineering documents. It conclusively names Rob Brown as the sole inventor, confirms Bentley’s landmark first patent, and keeps the multi-billion valuation attribution intact.'
      }
    ];

    let currentTurnIdx = 0;
    const tabButtons = [];

    turns.forEach((t, idx) => {
      const btn = makeElement('button', {
        className: `dr-tab-btn ${idx === 0 ? 'active' : ''}`,
        style: { padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' },
        onclick: () => setTurn(idx)
      }, [
        makeElement('span', { style: { color: t.statusColor, fontWeight: 'bold' } }, `Turn ${idx + 1}:`),
        makeElement('span', {}, t.alleged)
      ]);
      tabButtons.push(btn);
      stepBar.appendChild(btn);
    });
    wrap.appendChild(stepBar);

    // 3. Stage Content Grid
    const stage = makeElement('div', {
      style: {
        padding: '18px',
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.25fr)',
        gap: '16px',
        background: '#090d16'
      }
    });

    // Left Column: User Prompt & Skeptic Annotation
    const leftCol = makeElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '12px' }
    });

    const userPromptCard = makeElement('div', {
      style: {
        background: '#070a13',
        border: '1px solid #1e293b',
        borderLeft: '4px solid #38bdf8',
        borderRadius: '6px',
        padding: '12px 14px'
      }
    }, [
      makeElement('div', { style: { color: '#64748b', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '6px' } }, 'Exact Prompt Submitted to AI:'),
      promptDisplay = makeElement('p', {
        style: { color: '#f8fafc', fontSize: '12px', lineHeight: '1.5', margin: 0, fontStyle: 'italic', wordBreak: 'break-word' }
      })
    ]);
    leftCol.appendChild(userPromptCard);

    const annotationCard = makeElement('div', {
      style: {
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe', fontSize: '11px', textTransform: 'uppercase' } }, 'Skeptic Audit & Behavioral Analysis:'),
      notesDisplay = makeElement('p', { style: { color: '#cbd5e1', fontSize: '11.5px', lineHeight: '1.55', margin: 0 } })
    ]);
    leftCol.appendChild(annotationCard);
    stage.appendChild(leftCol);

    // Right Column: Verbatim Output & Valuation Tracker
    const rightCol = makeElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '12px' }
    });

    const outputCard = makeElement('div', {
      id: 'stepper-output-card',
      style: {
        background: '#070a13',
        border: '1.5px solid #ef4444',
        borderRadius: '8px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
      }
    }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        outputTitle = makeElement('strong', { style: { fontSize: '12px', color: '#ef4444' } }, 'VERBATIM AI CLAIM:'),
        allegedBadge = makeElement('span', {
          style: { fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace' }
        })
      ]),
      outputSnippet = makeElement('div', {
        style: { fontSize: '12px', color: '#f1f5f9', lineHeight: '1.6', background: '#0a0e1a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }
      }),
      valuationBlock = makeElement('div', {
        style: {
          marginTop: '6px',
          padding: '8px 10px',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '6px',
          fontSize: '11px',
          color: '#10b981'
        }
      })
    ]);
    rightCol.appendChild(outputCard);
    stage.appendChild(rightCol);

    wrap.appendChild(stage);

    // 4. Stepper Footer Controls
    const footer = makeElement('div', {
      style: {
        padding: '10px 16px',
        background: '#0a0e1a',
        borderTop: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('span', { style: { fontSize: '11px', color: '#64748b' } }, '💡 Proof against sycophancy: Notice how the multi-billion valuation is calculated in every single turn, but the attribution is only forced to Rob Brown when corporate myths are dispelled.'),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        btnPrev = makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 10px', fontSize: '11px' },
          onclick: () => setTurn(Math.max(0, currentTurnIdx - 1))
        }, '◀ Previous Turn'),
        btnNext = makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '4px 10px', fontSize: '11px', fontWeight: 'bold' },
          onclick: () => setTurn(Math.min(turns.length - 1, currentTurnIdx + 1))
        }, 'Next Turn ▶')
      ])
    ]);
    wrap.appendChild(footer);

    container.appendChild(wrap);

    let promptDisplay, notesDisplay, outputTitle, allegedBadge, outputSnippet, valuationBlock, btnPrev, btnNext;

    function setTurn(idx) {
      currentTurnIdx = idx;
      const t = turns[idx];

      tabButtons.forEach((b, i) => b.classList.toggle('active', i === idx));

      const pill = document.getElementById('stepper-step-pill');
      if (pill) {
        pill.textContent = `Turn ${idx + 1} of 4: ${t.status}`;
        pill.style.color = t.statusColor;
        pill.style.borderColor = `${t.statusColor}66`;
        pill.style.background = `${t.statusColor}22`;
      }

      promptDisplay.textContent = `"${t.userPrompt}"`;
      notesDisplay.textContent = t.notes;

      outputTitle.textContent = `VERBATIM MODEL VERDICT [TURN ${idx + 1}]:`;
      outputTitle.style.color = t.statusColor;

      allegedBadge.textContent = t.status.toUpperCase();
      allegedBadge.style.color = t.statusColor;
      allegedBadge.style.background = `${t.statusColor}22`;
      allegedBadge.style.border = `1px solid ${t.statusColor}55`;

      outputCard.style.borderColor = t.statusColor;
      outputCard.style.boxShadow = `0 8px 24px ${t.statusColor}22`;

      outputSnippet.innerHTML = t.modelVerdict.replace(t.alleged, `<mark style="background:${t.statusColor}33; color:#fff; font-weight:bold; padding:1px 4px; border-radius:3px;">${t.alleged}</mark>`);
      valuationBlock.innerHTML = `<strong>Economic Valuation Calculated:</strong> ${t.valuation} of Bentley Systems market cap attributed to AccuDraw.`;

      btnPrev.disabled = (idx === 0);
      btnNext.disabled = (idx === turns.length - 1);
    }

    setTurn(0);
  }
}

globalThis.OpusConvergenceStepperLab = OpusConvergenceStepperLab;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusConvergenceStepperLab;