class OpusQ4CockpitContent {
  static getMeta() {
    return {
      kicker: 'Quadrant IV • Fleet Cockpit',
      title: '4. Fleet Infrastructure & Cockpit (HomeSetup, Luno, Library)',
      subtitle: 'Multi-node LAN federation on Port 8080 connecting Mac and Linux, zero-token clipboard container execution, and living specification engines.'
    };
  }

  static manifest() {
    return [
      {
        section: 'q4_overview',
        partLabel: 'Quadrant IV • Operations',
        title: 'Luno Workspace & Port 8080 Federation',
        blocks: [
          { id: 'p_q4_summary_1', type: 'p' },
          { id: 'sidebar_q4_mesh', type: 'sidebar', kicker: 'Fleet Infrastructure', title: 'Universal Port 8080 & Zero-Token Dev Loop' }
        ]
      }
    ];
  }

  static p_q4_summary_1() {
    return [
      "To power this rapid development without expensive commercial toolchains or cloud dependencies, I built **Luno Workspace**—a phone-first development cockpit running locally on Node.js.",
      "Luno uses the **HTML Container Protocol** (`<script data-file=\"...\" data-method=\"...\" data-action=\"patch\">`). An LLM streams back surgical method patches, which Luno's in-browser Acorn AST patcher splices into disk or runtime memory in milliseconds. This eliminates token bloat and allows continuous development loops directly through the clipboard.",
      "Across our home fleet, Luno operates as a **Port 8080 Federation**, enabling zero-password HTTP synchronization between the Mac Mini (`10.0.0.226:8080`) and the Ubuntu Linux laptop (`10.0.0.245:8080`)."
    ];
  }

  static sidebar_q4_mesh() {
    return [
      "Quadrant IV Fleet & Cockpit Specifications:\n" +
      "• Universal Port 8080: Complete elimination of legacy port 3000 remnants across all configs.\n" +
      "• HTML Container Protocol: Client-side Acorn AST method splicing (<script data-method=\"...\">).\n" +
      "• Dynamic Subnet Discovery: Auto-detects peer machines on 10.0.0.x without static IP assumptions.\n" +
      "• Zero-Leak Credentials: Passwords stored in local environment files, never pasted to prompts.\n" +
      "• Primary Repositories: `HomeSetup`, `Luno`, `Library`."
    ];
  }
}

globalThis.OpusQ4CockpitContent = OpusQ4CockpitContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusQ4CockpitContent;