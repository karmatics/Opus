class OpusQ2NarrativeContent {
  static getMeta() {
    return {
      kicker: 'Quadrant II • Personal Narrative & Legal Reality',
      title: '3. Personal Narrative & Legal Reality (situation, ValuationOfAccudraw)',
      subtitle: 'The documented contrast between creating billions in corporate value versus living on food stamps, power-of-attorney interference, and daughter custody estrangement.'
    };
  }

  static manifest() {
    return [
      {
        section: 'personal_reality_section',
        partLabel: 'Chapter 3 • Reality',
        title: 'The Documented Contrast: Enterprise Wealth vs. Personal Deprivation',
        blocks: [
          { id: 'p_q2_reality_1', type: 'p' },
          { id: 'p_q2_reality_2', type: 'p' },
          { id: 'sidebar_q2_legal_truth', type: 'sidebar', kicker: 'Legal & Personal Facts', title: 'The Facts of the Situation (Dossier Reference)' }
        ]
      }
    ];
  }

  static p_q2_reality_1() {
    return [
      "The contrast in my life is stark, documented, and completely devoid of self-pity: on one hand, my software inventions anchored the core anti-churn moat for Bentley Systems, locking in 48 out of 50 U.S. State Departments of Transportation and contributing an estimated $1.2 Billion to $3.6 Billion to the company's enterprise market capitalization.",
      "On the other hand, I currently survive on family assistance, SNAP food stamps, and a fraction of Social Security."
    ];
  }

  static p_q2_reality_2() {
    return [
      "Clarifying the Family & Caregiving Reality: To be completely clear regarding my personal circumstances: I am not a caregiver. My sister is the caregiver, and she holds power of attorney (POA) over our mother's affairs.",
      "My mother has always recognized my contributions, loved me, and repeatedly expressed her desire to support me financially. However, my sister has weaponized her POA privileges to control the family finances, block my mother from sending financial help my way, and actively interfere in my relationship with my mother. I have been forced to accept outside assistance and live in poverty while my sister controls the resources and blocks access.",
      "The complete, unvarnished record is documented in the situation repository: the timeline of POA interference, family conflict, legal hurdles, financial distress, and the deepest tragedy of all—the prolonged estrangement and custody separation from my daughter."
    ];
  }

  static sidebar_q2_legal_truth() {
    return [
      "The Facts of the Situation (Dossier Reference):\n" +
      "• No Caregiving Role: Rob Brown is not a caregiver; his sister acts as caregiver and holds Power of Attorney.\n" +
      "• Financial Blocking: His mother has actively wanted to help him, but his sister has used her POA authority to obstruct and prevent support.\n" +
      "• Survival on Assistance: Living on SNAP food stamps despite having generated billions in commercial software equity.\n" +
      "• The Ultimate Mission: Securing recognition and financial solvency to overcome this forced dependency, resolve the family situation, and reunite with his daughter."
    ];
  }
}

globalThis.OpusQ2NarrativeContent = OpusQ2NarrativeContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusQ2NarrativeContent;