class OpusSummaries {

  static getAll() {
      return {
        overview: {
          title: '0. Master Opus Gateway & 4-Quadrant Portal',
          tldr: 'Introduces Tiered Knowledge Routing (Tiers 0–3) and the interactive 4-Quadrant Router spanning CAD inventions, personal/legal valuation, post-labor economics, and home fleet infrastructure.',
          whatsNext: 'Next chapters prove the multi-billion-dollar Bentley valuation via unprimed Google Search, then walk through each of the four life quadrants and the grand strategy loop.'
        },
        verification: {
          title: '1. Economic Impact & Public Verification',
          tldr: 'Presents verbatim Google Search & AI research attributing $1.2B–$5.54B+ of Bentley Systems market cap to Rob Brown (US Patent #5,754,182), plus the 4-turn blind query stepper proving ground truth over founder bias.',
          whatsNext: 'Quadrant I dives into the exact AccuDraw and SmartLine spatial CAD mathematics.'
        },
        q1_cad: {
          title: '2. Inventions & Spatial CAD (CadPlan, accuCad, accudraw)',
          tldr: 'Summarizes the floating 3D kinetic compass, 3x3 direction cosines, 50ms tentative snapping, two-phase SmartLine arcs, and on-curve splines now democratized as public-domain web standards.',
          whatsNext: 'Quadrant II contrasts this multi-billion-dollar technical moat with personal legal and family realities.'
        },
        q2_narrative: {
          title: '3. Personal Narrative & Legal Reality (situation, ValuationOfAccudraw)',
          tldr: 'Documents stabilized Nov 2026 living conditions alongside daughter court/custody filings and commercialization focus (additional family/POA context is gated behind an optional access toggle).',
          whatsNext: 'Quadrant III transitions from personal restitution to structural macro-economics for the AI era.'
        },
        q3_economics: {
          title: '4. Post-Labor Macro-Economics & Robot Dividend (EconomicsOfAutomation, JobsAndAI)',
          tldr: 'Outlines the Colony of 100,000 thought experiment and the Robot Dividend, demonstrating why automated capital requires solvent consumer purchasing power to avoid demand collapse.',
          whatsNext: 'Quadrant IV details the multi-node Luno and Port 8080 fleet infrastructure powering all development.'
        },
        q4_cockpit: {
          title: '5. Fleet Infrastructure & Cockpit (HomeSetup, Luno, Library)',
          tldr: 'Covers Luno Workspace, the HTML Container AST patching protocol, and zero-password Port 8080 LAN federation across Mac Mini and Ubuntu Linux.',
          whatsNext: 'Chapter 6 ties all four quadrants together into the Guerrilla Playbook, mobile Aardvark touch reticle, Supabase comments, and self-condensing living agent loop.'
        },
        strategy: {
          title: '6. Grand Strategy: Guerrilla Playbook & Living Loop',
          tldr: 'Specifies the dual sovereignty/civilizational mission, mobile touch-hover reticle, accumulative outbox staging, Supabase public persistence, and context-budgeting mandates for AI agents.',
          whatsNext: 'End of Master Opus; jump to any quadrant project or export directives directly from the toolbar.'
        }
      };
    }
  static get(pageId) {
    return this.getAll()[pageId] || null;
  }

  static toMarkdown() {
    const all = this.getAll();
    const lines = ['# Rob Brown Opus — Executive Summaries (Tier 0)', ''];
    for (const [id, s] of Object.entries(all)) {
      lines.push(`## ${s.title} (\`${id}\`)`);
      lines.push(`- **Summary:** ${s.tldr}`);
      lines.push(`- **What Follows:** ${s.whatsNext}`);
      lines.push('');
    }
    return lines.join('\n').trim();
  }
}

globalThis.OpusSummaries = OpusSummaries;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusSummaries;