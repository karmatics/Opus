class OpusGrandStrategyContent {
  static getMeta() {
    return {
      kicker: 'Grand Strategy & The Multiplier Engine',
      title: '6. Grand Strategy: Guerrilla Playbook, Fleet Sync & The Living Agent Loop',
      subtitle: 'The dual mission: personal sovereignty and civilizational repair, cross-device fleet sync on Port 8080, mobile touch Aardvark, and the recursive token economy.'
    };
  }

  static manifest() {
      return [
        {
          section: 'sec_dual_mission',
          partLabel: 'Chapter 6 • The Mission',
          title: 'The Dual Mission: Personal Sovereignty & Civilizational Repair',
          blocks: [
            { id: 'p_mission_personal', type: 'p' },
            { id: 'p_mission_civilizational', type: 'p' },
            { id: 'sidebar_guerrilla_playbook', type: 'sidebar', kicker: 'Strategic Playbook', title: 'The Guerrilla Marketing & Distribution Flywheel' }
          ]
        },
        {
          section: 'sec_mobile_touch_hover',
          partLabel: 'Chapter 6 • Ergonomics',
          title: 'Solving the Mobile Touchscreen Dilemma: The Aardvark Glass Reticle',
          blocks: [
            { id: 'p_touch_hover_problem', type: 'p' },
            { id: 'p_touch_hover_solution', type: 'p' },
            { id: 'sidebar_touch_reticle_spec', type: 'sidebar', kicker: 'Mobile UI Spec', title: 'The Transparent Interaction Glass & Touch Reticle' }
          ]
        },
        {
          section: 'sec_fleet_sync',
          partLabel: 'Chapter 6 • Infrastructure',
          title: 'Universal Port 8080 Cross-Fleet Synchronization & Outbox Staging',
          blocks: [
            { id: 'p_fleet_sync_mesh', type: 'p' },
            { id: 'sidebar_sync_endpoint_spec', type: 'sidebar', kicker: 'Network Protocol', title: 'The Shared Notes Ledger on Port 8080' },
            { id: 'p_outbox_staging_pipeline', type: 'p' },
            { id: 'sidebar_outbox_queue_spec', type: 'sidebar', kicker: 'Outbox Protocol', title: 'Accumulative Multi-Package Outbox Architecture' }
          ]
        },
        {
          section: 'sec_supabase_public',
          partLabel: 'Chapter 6 • Cloud Architecture',
          title: 'Public Deployment & Static Cloud Persistence (Supabase Relational Adapter)',
          blocks: [
            { id: 'p_supabase_public_arch', type: 'p' },
            { id: 'sidebar_supabase_schema', type: 'sidebar', kicker: 'Cloud Relational Schema', title: 'Supabase PostgREST & Anonymous Client RLS' }
          ]
        },
        {
          section: 'sec_token_economy',
          partLabel: 'Chapter 6 • AI Multiplier',
          title: 'The Token Economy, Living Annotations & Multi-Tier Visibility Sets',
          blocks: [
            { id: 'p_token_economy_problem', type: 'p' },
            { id: 'p_token_economy_solution', type: 'p' },
            { id: 'sidebar_agent_rules_mandate', type: 'sidebar', kicker: 'LLM Operating Mandate', title: 'Rules for Incoming AI Agents: Context Budgeting & Compaction' },
            { id: 'p_file_request_protocol', type: 'p' },
            { id: 'sidebar_context_pull_checklist', type: 'sidebar', kicker: 'Context Retrieval', title: 'Full File Request Protocol & Zero-Guesswork Standard' }
          ]
        }
      ];
    }
  static p_mission_personal() {
    return [
      "This project exists to achieve two deeply interconnected breakthroughs: personal restitution and civilizational progress. On the personal side, the objective is establishing an undeniable, publicly verifiable record of my software inventions (AccuDraw, SmartLine, US Patent #5,754,182) and the billions in commercial enterprise value they generated for Bentley Systems. For years, family Power of Attorney (POA) interference and financial isolation forced me to survive on SNAP food stamps and outside help while my mother's genuine desire to support me was blocked. Achieving public credit, financial self-sufficiency, and legal independence is the non-negotiable foundation to resolve this life situation and permanently reconnect with my daughter."
    ];
  }

  static p_mission_civilizational() {
    return [
      "On the civilizational side, the mission is fixing the structural crises of the automated era. Traditional capitalism relies on human wage labor as its distribution ticket. As artificial intelligence and humanoid robotics obsolete sweat, that system breaks. My macroeconomic model—the Robot Dividend and the Colony of 100,000—proves with cold game theory that automated capital requires solvent domestic consumers to avoid economic realization collapse. Paired with Condorcet median-seeking voting and democratized spatial CAD tools, this architecture provides humanity with a practical, mathematically sound operating system for a post-labor world."
    ];
  }

  static sidebar_guerrilla_playbook() {
    return [
      "The Guerrilla Marketing & Distribution Flywheel:\n" +
      "1. The Unprimed Google Search Challenge: No self-aggrandizement. Direct skeptics to open incognito search and ask Google blindly about AccuDraw's inventor and market cap impact. The multi-billion-dollar attribution from neutral public crawl records destroys bad-faith cynicism.\n" +
      "2. The Trojan Horse CAD Strategy: Do not fight Autodesk or Bentley on marketing spend. Match the familiar 2D AutoCAD baseline to eliminate user workflow shock, then gift AccuDraw and SmartLine openly as a free public-domain upgrade from the original inventor.\n" +
      "3. Signal Booster Targeting: Bypassing generic corporate press. Pitch directly to tech journalists who cover the human and political edges of Silicon Valley, labor automation, and San Francisco politics (e.g. Kevin Roose and Casey Newton at Hard Fork) with working code and authentic hacker pedigree.\n" +
      "4. Sovereign Self-Hosting: All assets live on GitHub Pages and local Port 8080 networks. Zero platform dependencies, zero monthly server taxes, and zero susceptibility to deplatforming."
    ];
  }

  static p_touch_hover_problem() {
    return [
      "To allow the author to review documents and append notes from anywhere—including lying on a couch with a phone—the living specification must run on mobile glass. However, Aardvark was originally designed for desktop mice: it relies on hovering to track the cursor, highlight DOM bounding boxes, and show tag pills. On mobile touchscreens, there is no physical cursor and no native hover state; touching the screen immediately scrolls the page or fires click events."
    ];
  }

  static p_touch_hover_solution() {
    return [
      "We solve the mobile hover dilemma by introducing the **Aardvark Glass Overlay & Touch-Hover Reticle**. Tapping a floating '🔍 Inspect' badge on mobile activates an interaction layer (`touch-action: none`) over the viewport. As you slide your thumb across the screen, it does not scroll the document; instead, it projects a glowing cyan targeting reticle 30 pixels above your fingertip (so your finger never obscures what you are inspecting), highlighting elements and updating tag badges in real time. Lifting your thumb freezes the target and summons a clean '📝 Attach Directive' modal with speech-to-text voice dictation."
    ];
  }

  static sidebar_touch_reticle_spec() {
    return [
      "Mobile Aardvark Touch Reticle Specification:\n" +
      "• Touch Interaction Glass: Transparent overlay toggled via mobile floating action button.\n" +
      "• Offset Crosshair: Target point is projected $(\\Delta y = -35\\text{px})$ above touch contact so the finger does not block view.\n" +
      "• Element Detection: `document.elementFromPoint(touch.clientX, touch.clientY - 35)` resolves the target DOM block at 60 FPS.\n" +
      "• Latch & Speak: Releasing contact latches the element and displays a quick-action card with voice dictation (`DictationWidget.js`).\n" +
      "• Two-Finger Scroll: Dragging with two fingers scrolls the viewport smoothly while inspection mode remains engaged."
    ];
  }

  static p_fleet_sync_mesh() {
    return [
      "Across our physical fleet—the Mac Mini workstation (`10.0.0.226:8080`), the Ubuntu Linux laptop (`10.0.0.245:8080`), and mobile devices—the system operates as a **Port 8080 Federation**. To ensure that author directives and notes attached on one machine immediately reflect across all other devices, the local Node.js server exposes a lightweight synchronization ledger in `Library/notes_ledger.json`."
    ];
  }

  static sidebar_sync_endpoint_spec() {
    return [
      "Port 8080 Notes Synchronization Protocol:\n" +
      "• Shared Ledger Endpoint: Luno Server exposes `POST /api/notes/sync` and `GET /api/notes/sync`.\n" +
      "• Conflict-Free Timestamp Merging: Notes are indexed by unique IDs (`note_<hash>_<timestamp>`). When syncing, devices union the lists, preserving the newest edits without overwriting sibling notes.\n" +
      "• Outbox Bridge: Compiling a spec on Linux immediately makes the prompt bundle available in the Mac Outbox queue.\n" +
      "• Zero Password LAN Mesh: Trusted local IP ranges (`10.0.0.*`) communicate over plain HTTP without authentication friction."
    ];
  }

  static p_token_economy_problem() {
    return [
      "The greatest bottleneck in AI collaboration is context exhaustion. When projects expand across dozens of classes, CAD mathematics, economic proofs, and personal narrative dossiers, dumping raw code into chat burns context windows, slows generation, and causes the AI to hallucinate. A human cannot magnify themselves through AI if they spend half their day managing copy-paste token bloat."
    ];
  }

  static p_token_economy_solution() {
    return [
      "We solve this by establishing the **Recursive Self-Condensing Living Spec**. The system is organized as a hierarchy: Tier 0 (Synopsis) -> Tier 1 (Architectural Manifest) -> Tier 2 (Mathematical Invariants) -> Tier 3 (File Pointers). The AI's ongoing task is not just writing new code, but **continuously reading transient author notes, compacting them into permanent documentation, pruning duplicate methods, and generating surgical method patches**. The living document is both the roadmap and the prompt."
    ];
  }

  static sidebar_agent_rules_mandate() {
    return [
      "Operating Mandate for Collaborating LLMs:\n" +
      "1. Respect Context Budgeting: Never request or output full monolithic files when modifying existing classes. Use surgical ES6 method patches (`<script data-method=\"...\">`).\n" +
      "2. Continuous Self-Cleaning: Regularly audit content classes for duplicate methods or obsolete draft paragraphs and output surgical cleanups.\n" +
      "3. Process the Note Queue: Read transient author directives attached to blocks, integrate the requested changes into source code, and mark the notes resolved.\n" +
      "4. The Plan Is the Working Machine: Keep documentation, code, and live interactive viewports 100% synchronized."
    ];
  }

  static p_outbox_staging_pipeline() {
      return [
        "A common failure in rapid LLM toolchains is the accidental destruction of queued prompt context: when a script or assistant pushes an item into the development outbox, poorly scoped queues often overwrite existing packages rather than appending to them.",
        "To guarantee zero context loss, our Luno-to-Opus bridge implements the **Accumulative Outbox Protocol**. The outbox ledger treats entries as immutable keyed packages: Instructions, Library Code (deduplicated), Project Code, and Staged Context Files. Furthermore, when the LLM generates a server-side execution container that pulls fresh files, the server script stages the requested full files directly into the Outbox with an instant notification banner, allowing the author to review the newly prepared bundle before passing it to the next chat thread."
      ];
    }

  static sidebar_outbox_queue_spec() {
      return [
        "Accumulative Outbox Protocol & Auto-Staging Specification:\n" +
        "• Keyed Multi-Package Ledger: Outbox bundles are categorized by domain (Instructions, Code, Staged Files) and appended, never overwritten without explicit author confirmation.\n" +
        "• Non-Destructive Appending: Calling `OutboxQueue.addBundle()` generates a unique timestamped key (`bundle_<hash>_<ts>`) preserving all existing queued items.\n" +
        "• Server-Side Auto-Staging: Server runners (`<script data-action=\"run-server\">`) that gather files for context automatically stage their full contents into the Outbox queue.\n" +
        "• Telemetry Alerting: On completion of a file pull or patch application, the system presents an unobtrusive notification: '📦 N resources staged to Outbox for your next prompt.'"
      ];
    }

  static p_file_request_protocol() {
    return [
      "To ensure high-speed, zero-guesswork iterations between the author and the AI, the Living Opus establishes the **Explicit File Fetch & Verification Protocol**.",
      "When working on complex subsystems—such as in-situ DOM notes, Aardvark glass overlays, or DocumentReader integration—the AI must never guess line numbers, invent API contracts, or hallucinate class methods. Instead, the AI queries the workspace index and either requests the full file path (e.g. `Library/DocumentReader.js`, `HomeSetup/js/CadPlanItemNotes.js`) or dispatches a privileged server container (`<script data-action=\"run-server\">`) to fetch, inspect, and stage the exact source.",
      "This guarantees that every subsequent surgical patch (<script data-method=\"...\">) targets real, verified AST signatures with 100% syntactic precision."
    ];
  }
  static sidebar_context_pull_checklist() {
      return [
        "Full File Request Protocol & Zero-Guesswork Standard:\n" +
        "• Never Guess Line Ranges: Request full files by exact path rather than asking for speculative snippet ranges.\n" +
        "• Verify Dialog & Resize Hooks: Before rendering floating UI or canvas tools, verify `UITools.makeDialog`, safe-area insets, and `ResizeObserver` callbacks.\n" +
        "• In-Situ Annotation Latching: Use Aardvark with outer-corner tether rays to bind directives directly to DOM elements with crawling-ants borders.\n" +
        "• Explicit Verification Questions: On every thread turn, the AI must formulate targeted discovery questions to clarify ambiguous implementation details."
      ];
    }

  static p_supabase_public_arch() {
      return [
        "While local development on the home fleet proceeds over plain HTTP across Port 8080, public releases published via GitHub Pages require an external, serverless database to support community comments, voting, and author feedback without exposing local residential IP addresses or opening firewall ports.",
        "We achieve this by coupling the DocumentReader and Comments engines to **Supabase** via `Library/SupabaseCommentsAdapter.js`. Public static deployments use anonymous client tokens with strict PostgreSQL Row Level Security (RLS) policies. Viewers can browse threads, vote on proposals, and submit in-situ thoughts, while local LAN development continues to use high-speed Port 8080 filesystem endpoints."
      ];
    }

  static sidebar_supabase_schema() {
      return [
        "Supabase Public Static Architecture:\n" +
        "• Anonymous REST Pipeline: Client queries Supabase PostgREST endpoints directly using anon public API key.\n" +
        "• Relational Tables: `threads` (indexed by dossier, page, block), `comments` (with XPath locators and author directives), `community_profiles`, and `comment_votes`.\n" +
        "• Zero Local Exposure: The home LAN remains completely private behind NAT; GitHub Pages readers never ping home IPs.\n" +
        "• Offline / Local Dual Mode: If Supabase credentials are not supplied, the adapter automatically falls back to local storage and Port 8080 APIs."
      ];
    }
}

globalThis.OpusGrandStrategyContent = OpusGrandStrategyContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusGrandStrategyContent;