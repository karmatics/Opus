class OpusQ2NarrativeContent {
  static getMeta() {
    return {
      kicker: 'Quadrant II • Valuation & Reality',
      title: '2. Personal Narrative & Forensic Valuation (situation, ValuationOfAccudraw)',
      subtitle: 'The documented contrast between creating $5.0B–$6.5B in corporate value versus living on food stamps, caretaker bias, and daughter custody separation.'
    };
  }

  static manifest() {
    return [
      {
        section: 'q2_overview',
        partLabel: 'Quadrant II • Life & Valuation',
        title: 'Forensic Accounting & The Personal Struggle',
        blocks: [
          { id: 'p_q2_summary_1', type: 'p' },
          { id: 'sidebar_q2_facts', type: 'sidebar', kicker: 'Forensic Summary', title: 'Valuation Metrics & Legal Reality' }
        ]
      }
    ];
  }

  static p_q2_summary_1() {
    return [
      "The contrast in my life is stark and documented. On one hand, my software inventions anchored the core anti-churn moat for Bentley Systems, locking in 48 out of 50 U.S. State Departments of Transportation and contributing an estimated **$5.0 Billion to $6.5 Billion** of the company's enterprise market capitalization.",
      "On the other hand, I currently survive on family assistance, food stamps, and a fraction of Social Security. The `situation` repository documents the legal, medical, and personal reality: years of uncompensated elder caregiving, caretaker bias in family disputes, severe financial hardship, and the painful estrangement from my daughter.",
      "This quadrant is not an appeal for pity—it is an undeniable, forensic presentation of truth. The goal is achieving the visibility and financial restitution required to solve this life situation and reconnect with my daughter."
    ];
  }

  static sidebar_q2_facts() {
    return [
      "Quadrant II Forensic Dossier Facts:\n" +
      "• Enterprise Attribution: $5.0B to $6.5B of Bentley's ~$11B–$12B market cap attributed to AccuDraw neuromuscular lock-in.\n" +
      "• MicroStation 95 Window: Saved Bentley from hostile acquisition or displacement during the AutoCAD R13 crisis.\n" +
      "• The Human Reality: Food stamps, elder caregiving sacrifices, legal estrangement from daughter.\n" +
      "• Primary Repositories: `situation`, `ValuationOfAccudraw`."
    ];
  }
}

globalThis.OpusQ2NarrativeContent = OpusQ2NarrativeContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusQ2NarrativeContent;