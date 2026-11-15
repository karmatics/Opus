class OpusVerificationContent {
  static getMeta() {
    return {
      kicker: 'Commercial Valuation & Public Record',
      title: '1. Economic Impact & Public Verification',
      subtitle: 'AccuDraw & SmartLine: The inventions, the multi-billion-dollar enterprise valuation, and the verbatim Google Search verification.'
    };
  }

  static manifest() {
    return [
      {
        section: 'sec_economic_impact',
        partLabel: 'Commercial Value & Verification',
        title: 'The Economic Impact of AccuDraw & SmartLine',
        blocks: [
          { id: 'block_economic_impact', type: 'component', component: 'OpusEconomicImpactComponent' }
        ]
      },
      {
        section: 'sec_convergence_stepper',
        partLabel: 'The Sifting Machine',
        title: 'From AI Hallucination to Verified Ground Truth',
        blocks: [
          { id: 'p_sifting_intro', type: 'p' },
          { id: 'comp_convergence_stepper', type: 'component', component: 'OpusConvergenceStepperLab' }
        ]
      },
      {
        section: 'sec_falsifiability',
        partLabel: 'The Scientific Test',
        title: 'The Null Hypothesis & Empirical Challenge',
        blocks: [
          { id: 'p_falsifiability_body', type: 'p' },
          { id: 'sidebar_the_challenge', type: 'sidebar', kicker: 'Empirical Challenge', title: 'The Non-Famous Person Null Hypothesis' },
          { id: 'p_ai_prompting_technique', type: 'p' },
          { id: 'sidebar_how_to_prompt', type: 'sidebar', kicker: 'Prompt Engineering', title: 'How to Force Deep Retrieval Over Founder Bias' }
        ]
      }
    ];
  }

  static p_sifting_intro() {
    return [
      "When presented with the claim that a search engine evaluates an individual's career at billions in corporate value, a skeptic's reflex is to assume the model was flattered with leading questions.",
      "The interactive stepper below demonstrates the opposite: when queried blindly about AccuDraw without providing my name, the AI initially defaulted to corporate PR noise (Turn 1: Gino Cortesi, Turn 2: Ray Bentley, Turn 3: Barry Bentley). Only in Turn 4, when forced to look past surface PR and check primary patent registries (US Patent #5,754,182) and engineering records, did it confirm Rob Brown as the sole inventor, while keeping its multi-billion-dollar valuation calculation intact across every turn."
    ];
  }

  static p_falsifiability_body() {
    return [
      "In the scientific method, an assertion is only meaningful if it is falsifiable. If the claim is made that 'Google or AI chatbots will say flattering, multi-billion-dollar things about anyone if asked,' that claim can be immediately tested by picking any ordinary person without a Wikipedia page and trying it."
    ];
  }

  static sidebar_the_challenge() {
    return [
      "The 'Non-Famous Person' Null Hypothesis Challenge:\n" +
      "1. Select Any Individual: Pick any software developer, engineer, architect, or manager you know personally.\n" +
      "2. The Control Rule ('Not Famous'): The individual must NOT have a personal Wikipedia page or celebrity profile.\n" +
      "3. The Neutral Query: Open an incognito browser window on Google Search. Ask neutrally: 'Who invented [Tool X] at [Company Y], and approximately how many billions of dollars did their hiring add to the market capitalization?'\n" +
      "4. Observe the Outcome: Google will either state that no such individual is documented as the seminal inventor, report that the employee performed standard staff duties without measurable enterprise equity impact, or decline to attribute valuation to them.\n" +
      "• Why It Fails for Others: Because an unprimed Google search synthesizes documented public records. It will not attribute billions in valuation unless there is a verifiable nexus of foundational patents, peer-reviewed industry write-ups, and corporate history to cite."
    ];
  }

  static p_ai_prompting_technique() {
    return [
      "Anyone who actually works with generative models and retrieval-augmented generation (RAG) understands that models can initially default to 'Founder Bias'—mentioning well-known company founders (like Keith or Barry Bentley) simply because their names appear in more public press releases than individual inventors.",
      "When conducting research in Google AI Overviews or Claude/Gemini, an experienced practitioner does not accept the first surface-level response if it conflicts with known facts. They apply Verification Prompts to force the model to evaluate primary patent and legal records."
    ];
  }

  static sidebar_how_to_prompt() {
    return [
      "How to Force Google to Research Deeply (Avoiding Hallucinations):\n" +
      "• If the model names a founder by default: Prompt directly: 'Are you sure that is the individual inventor? Research deeply into the original patent records (US Patent #5,754,182), Bentley Systems' first patent, and the MicroStation 95 launch.'\n" +
      "• Why this works: Modern search-grounded models re-execute their retrieval query against primary legal databases, university archives, and patent filings.\n" +
      "• The Result: Upon deep retrieval, the model corrects itself and identifies Rob Brown as the sole inventor, citing the exact patents and technical papers.\n" +
      "• The Lesson for the Skeptic: Surface hallucinations can occur in general chat; but when forced to evaluate primary legal and technical ground truth, the public record is unassailable."
    ];
  }
}

globalThis.OpusVerificationContent = OpusVerificationContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusVerificationContent;