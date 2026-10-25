class OpusOverviewContent {
  static getMeta() {
    return {
      kicker: 'The Architecture of the Architecture',
      title: '0. Master Opus Gateway & 4-Quadrant Portal',
      subtitle: 'The unified living specification router: selective context depth, four interconnected life quadrants, and zero token waste.'
    };
  }

  static manifest() {
    return [
      {
        section: 'gateway_top',
        partLabel: 'Gateway • Master Router',
        title: 'The Rob Brown Opus: Selective Context Depth & Knowledge Portal',
        blocks: [
          { id: 'comp_opus_router', type: 'component', component: 'OpusRouterComponent' },
          { id: 'p_overview_intro_1', type: 'p' },
          { id: 'p_overview_intro_2', type: 'p' },
          { id: 'sidebar_4_quadrants_summary', type: 'sidebar', kicker: 'Grand Opus Map', title: 'The 4 Interconnected Life Quadrants' }
        ]
      }
    ];
  }

  static p_overview_intro_1() {
    return [
      "Welcome to the **Rob Brown Master Opus Portal**. In software engineering and AI collaboration, the primary obstacle to building ambitious systems has always been context fatigue: dumping tens of thousands of lines of code into a model burns token limits, degrades recall, and causes hallucinations.",
      "This portal solves that problem by introducing **Tiered Knowledge Routing**. The entire scope of my 30-year career—spanning spatial CAD constraint mathematics, forensic financial valuation models, post-labor macroeconomic frameworks, and multi-node home fleet infrastructure—is structured into an addressable, four-quadrant matrix."
    ];
  }

  static p_overview_intro_2() {
    return [
      "Instead of forcing an LLM or human reader to ingest monolithic dumps, this portal provides **selective depth**:",
      "• **Tier 0 (Synopsis):** Rapid 250-token executive orientations.",
      "• **Tier 1 (Deep Narrative):** Thorough 1,200-token architectural syntheses informed directly by verified source repositories.",
      "• **Tier 2 (Invariants & Math):** Exact formulas, direction cosines, and state machine transitions.",
      "• **Tier 3 (File Manifest):** Precise file pointers so AI agents pull only the single file they are modifying.",
      "Use the interactive router above to inspect any quadrant, copy customized prompt packages, or launch live 3D viewports."
    ];
  }

  static sidebar_4_quadrants_summary() {
    return [
      "The 4-Quadrant Architecture Map:\n" +
      "• Quadrant I: Spatial CAD Inventions (`CadPlan`, `accuCad`, `accudraw`)\n" +
      "  - AccuDraw 3D kinetic compass, SmartLine continuous chaining, on-curve splines, and US Patent #5,754,182.\n" +
      "• Quadrant II: Personal Narrative & Valuation Reality (`situation`, `ValuationOfAccudraw`)\n" +
      "  - The $5.0B–$6.5B Bentley valuation contribution vs. living on food stamps, caretaker bias, and parental alienation.\n" +
      "• Quadrant III: Post-Labor Macro-Economics (`EconomicsOfAutomation`, `JobsAndAI`)\n" +
      "  - The Robot Dividend, the Colony of 100,000, and mathematical models for surviving automation.\n" +
      "• Quadrant IV: Operating Cockpit & Fleet Infrastructure (`HomeSetup`, `Luno`, `Library`)\n" +
      "  - Universal Port 8080 LAN federation, zero-token clipboard container execution, and multi-node hardware topology."
    ];
  }
}

globalThis.OpusOverviewContent = OpusOverviewContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusOverviewContent;