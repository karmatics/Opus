class OpusQ2NarrativeContent {

  static getMeta() {
      return {
        kicker: 'Quadrant II • Personal Narrative & Legal Reality',
        title: '3. Personal Narrative & Legal Reality (situation, ValuationOfAccudraw)',
        subtitle: 'The contrast between enterprise software valuation and personal hardship, current November 2026 stability, daughter/court preparation, and gated sensitive records.'
      };
    }

  static manifest() {
      return [
        {
          section: 'personal_reality_section',
          partLabel: 'Chapter 3 • Reality & Court Readiness',
          title: 'The Documented Contrast, Current Stability & Legal Context',
          blocks: [
            { id: 'p_q2_reality_1', type: 'p' },
            { id: 'p_q2_reality_2', type: 'p' },
            { id: 'p_q2_daughter_custody', type: 'p' },
            { id: 'p_q2_support_and_employment', type: 'p' },
            {
              id: 'sidebar_q2_timeline',
              type: 'sidebar',
              kicker: 'Factual Chronology',
              title: 'Key Timeline: Custody, Career & Child Support Context'
            },
            {
              id: 'p_q2_jack_perspective',
              type: 'p',
              semiSensitive: true,
              semiSensitiveLabel: 'Additional Context: Jack, Don, AI Valuation Skepticism & Career Path (Expandable / AI Q&A)'
            },
            {
              id: 'p_q2_sister_poa',
              type: 'p',
              sensitive: true,
              sensitiveLabel: 'Additional Family & Caregiving Context',
              sensitiveSummary: 'Protected family and financial-support details (hidden by default; enter access code to view).'
            },
            {
              id: 'p_q2_virginia_report',
              type: 'p',
              sensitive: true,
              sensitiveLabel: 'Additional Elder Welfare Report & Trust Context',
              sensitiveSummary: 'Protected details regarding a therapy-initiated out-of-state contact inquiry and family trust tensions (hidden by default; enter access code to view).'
            },
            {
              id: 'p_q2_sister_social_media',
              type: 'p',
              sensitive: true,
              sensitiveLabel: 'Additional Interpersonal & Social Media Context',
              sensitiveSummary: 'Protected records regarding specific interpersonal disputes and social media statements (hidden by default; enter access code to view).'
            },
            {
              id: 'sidebar_q2_legal_truth',
              type: 'sidebar',
              kicker: 'Protected Reference',
              title: 'Additional Situation Reference Notes',
              sensitive: true,
              sensitiveLabel: 'Protected Personal & Legal Summary',
              sensitiveSummary: 'Protected reference notes from the situation dossier (hidden by default; enter access code to view).'
            }
          ]
        }
      ];
    }
  static p_q2_reality_1() {
    return [
      "The contrast in my life is stark, documented, and completely devoid of self-pity: on one hand, my software inventions anchored the core anti-churn moat for Bentley Systems, locking in 48 out of 50 U.S. State Departments of Transportation and contributing an estimated **$1.2 Billion to $3.6 Billion** (and up to $5.54B+ in unprimed search counterfactuals) to the company's enterprise market capitalization.",
      "On the other hand, I have had to survive on family assistance, SNAP food stamps, and a fraction of Social Security."
    ];
  }

  static p_q2_reality_2() {
      return [
        "**Current Living Status & Family Contact (Nov 2026):** As of November 2026, my day-to-day housing in **Chico, California** has recently stabilized after a difficult mid-2026 transition. Upfront for clarity: I am **out of contact with all of my blood relatives**—including my 94-year-old mother, the sister I used to speak with regularly, and my 12-year-old daughter Stella. This is not a separation I initiated: earlier efforts to speak with my mother involved supervision over what I was allowed to talk about, leaving communication strained and deeply uncomfortable. Carrying the loss of contact with both my daughter and my mother's family at the same time—despite completely opposite causes and ideologies—weighed heavily enough to push me into an unstable mental-health crisis I nearly did not survive. My brother-in-law **Jack** (who helped move me into my Chico apartment and start Social Security, with EBT phasing out) is the only family-side contact I communicate with right now, alongside **Don**, a detective/investigator Jack originally hired for a wellness check who remains on email and helped preserve communication between Jack and me.",
        "**Career Fit, Executive Dysfunction & June 2026 Context:** People often misunderstand my career: I have done very well when placed in an environment suited to my technical strengths, whereas forcing me into misaligned situations goes poorly. Alongside pursuing software work, I am applying for Social Security disability related to **executive dysfunction** and chronic avoidance of overwhelming paperwork—which is also why I keep all facts organized here to load into an AI without re-typing painful history. During June 2026—when power had been cut off, I had no access to my computer, family was unresponsive, and I felt completely abandoned while calling out my sister's actions—I recorded and shared several videos. Jack told me they offended people and were counterproductive; looking back, I recognize how destabilizing that period was and am communicating much more carefully now."
      ];
    }
  static sidebar_q2_legal_truth() {
      return [
        "The Facts of the Situation (Dossier Reference — Updated Nov 2026):\n" +
        "• Current Stability: Housing and utilities stabilized following mid-2026 transition; active focus on daughter & court filing workspace.\n" +
        "• Caregiver & POA Structure: His sister serves as their mother's caregiver and holds Power of Attorney.\n" +
        "• Financial Blocking: His mother has actively wanted to help him, but his sister has used her POA authority to obstruct and prevent support.\n" +
        "• The Ultimate Mission: Securing recognition, legal clarity for his daughter, and financial solvency to overcome forced dependency."
      ];
    }
  static p_q2_sister_poa() {
    return [
      "**Family Power of Attorney (POA) Context:** My sister is the caregiver and holds power of attorney (POA) over our mother's affairs. My mother has always recognized my contributions, loved me, and repeatedly expressed her desire to support me financially.",
      "However, my sister has weaponized her POA privileges to control the family finances, block my mother from sending financial help my way, and actively interfere in my relationship with my mother—forcing me to accept outside assistance and endure avoidable hardship while she controls the resources and blocks access."
    ];
  }

  static p_q2_jack_perspective() {
      return [
        "**Candid Context on Conversations with Jack & Don (For Difficult Discussions & AI Q&A):** I genuinely appreciate that Jack came out to help get me into my new apartment in Chico and onto Social Security, and that Don stayed on the email chain and helped preserve my connection with Jack. At the same time, our relationship remains strained because Jack has not shared his full long-term plan with me and both Jack and Don are focused on trying to get me declared disabled to increase Social Security, rather than supporting any path that uses my actual engineering strengths to get back on my feet.",
        "**Why the Independent AI / Search Valuations Matter Here:** When I discovered that ChatGPT, Gemini, Claude, and grounded Google Search independently estimate my past Bentley Systems inventions (AccuDraw and SmartLine) generated billions in enterprise value and rank among the highest-ROI hires in software history—even though that value never came back to me personally—Jack rejected the entire finding, claiming he could get an AI to say that about anyone. That claim is false and directly testable: as someone who built this entire AI-orchestration system myself, I specifically structured the verification prompts *without mentioning my name* so the models could not engage in sycophancy or flattery, and they still retrieved the same patent and market-cap attribution from public records. Jack has declined to run that neutral test himself. I keep this reflection out of the upfront court narrative so it does not create unnecessary friction, while leaving full context here so that if Jack, Don, or an AI helping mediate our conversations asks why I resist giving up on technical work, the reasoning is completely clear."
      ];
    }
  static p_q2_sister_social_media() {
      return [
        "**Sister Conflict & Social Media Record (Protected Layer):** Detailed records and commentary concerning the ongoing conflict with my sister—including public statements and posts she shared on social media—are kept behind this access gate rather than displayed on the main portal. Full page-level details belong in the `situation` dossier under `SensitiveContextGate` so that the public-facing narrative remains measured, court-appropriate, and focused on verifiable facts."
      ];
    }

  static p_q2_daughter_custody() {
      return [
        "**Stella (Age 12) & San Francisco Custody History:** My most important personal priority is my 12-year-old daughter, **Stella**, from whom I have been separated for over a year. Our divorce and custody proceedings were filed in **San Francisco Superior Court**. Back in **2017**, when Stella was three years old, I won **primary custody**. Earlier in our relationship—before Stella's mother moved back to San Francisco when Stella started kindergarten—I supported Stella's mother for approximately three years while she earned a new degree, and stepped back from pushing my own career for several years to focus on parenting and the custody case.",
        "**Blocked Contact & Unopened Spring 2026 Legal Mail:** Her mother lives in San Francisco while I am in Chico. Stella has been experiencing significant mental health challenges; after an incident at her mother's home was used to cut off contact despite prior 50/50 time under a temporary order, her mother turned Stella against me, told me Stella did not have to talk to me unless she wanted to, and refused to carry out the judge-ordered video contact—working against the court order (remarkably, even though my sister's political ideology and my ex-wife's ideology are polar opposites, both situations ended up severing vital family contact). Early this spring, I received thick legal packages from Stella's mother's lawyer; at the time, my family support was collapsing and executive-function paralysis during a mental-health breakdown left me unable to open them. Now that housing and Social Security are stabilized, I am bringing those unopened packages to my **therapy appointment tomorrow** so I can go through them constructively and respond properly."
      ];
    }
  static p_q2_support_and_employment() {
      return [
        "**Employment Disruption (~3 Years Ago) & AI Transition:** After stepping away from corporate employment for several years around the custody litigation, I returned briefly to **Bentley Systems**—where my earlier inventions had generated immense long-term value—in a coding role. Roughly **three years ago**, shortly after ChatGPT emerged, I was fired from Bentley. I was deeply energized by how AI could amplify software engineering at a time when Bentley had temporarily banned AI tools internally; whether my termination stemmed from broader department cuts or friction around coding and AI, I fell into severe depression afterward and have not held traditional employment since. Conventional corporate jobs have repeatedly been a poor fit for me, whereas AI-assisted software architecture—demonstrated by the live system hosting this document—plays directly to my strengths.",
        "**San Mateo Child Support Order & Social Security Withholding:** While the custody and divorce case was filed in San Francisco, **San Mateo County** handles the child support enforcement. Even while sharing 50/50 custody, a support order required payments to my ex-wife based on my earlier Bentley salary. Because that order was never modified downward after I lost my job nearly three years ago, arrears continued accumulating without wage income. Roughly a year ago, **$6,000** in arrears was paid off so I could move into an apartment in Chico, yet no modification was filed in the year since. Today, roughly **$600 per month is being withheld from my ~$1,900 monthly Social Security check**—nearly a third of my fixed income—while Stella's mother is employed and earning income.",
        "**Immediate Court Filing Objective:** I do not want to be a deadbeat dad, and relative to my actual income over the last three years I have overpaid substantially. My immediate legal objective in San Mateo is filing for a **child support modification and relief from unsustainable Social Security withholding** so my basic stability is protected while I address the San Francisco custody record and work toward commercializing my software."
      ];
    }

  static sidebar_q2_timeline() {
      return [
        "Chronological Record for Review & Court Preparation:\n" +
        "• Earlier Parenting Years: Supported ex-wife for ~3 years while she completed a new degree; stepped back from career advancement during custody demands.\n" +
        "• 2017 (San Francisco): Won primary custody of daughter Stella (then age 3); ex-wife relocated back to San Francisco around kindergarten.\n" +
        "• ~3 Years Ago: Returned briefly to Bentley Systems in a coding role; fired amid early post-ChatGPT AI restrictions and organizational friction, followed by depression and prolonged unemployment.\n" +
        "• 2024–2025 (San Mateo / Chico): Unmodified child support order (set at Bentley-era salary) accrued arrears; ~$6,000 paid off a year ago to enable Chico apartment move.\n" +
        "• Spring–June 2026: Received thick legal packages from ex-wife's counsel while housing/family support was collapsing (unable to open at the time); June power shutoff and severe instability when videos were shared.\n" +
        "• Nov 2026 (Current): Jack helped stabilize move into new Chico apartment and set up Social Security (EBT phasing out); ~$600/mo withheld by San Mateo from ~$1,900/mo SS; bringing unopened spring legal packages to therapy tomorrow; preparing San Mateo support modification and San Francisco custody response."
      ];
    }

  static p_q2_virginia_report() {
      return [
        "**Therapy-Initiated Elder Welfare Report to Virginia & Trust Misunderstanding (Protected Layer):** During therapy, when I explained that my sister had blocked me from speaking with our 94-year-old mother, my therapist stated she was mandated to report it and filed an elder-welfare report with **Virginia** authorities. Virginia followed up, and I was torn: I wanted to speak directly with the investigator about how preventing my mother and me from communicating—blocking me from telling her about family bias or my career prospects—is treated as improper interference/isolation under California standards, yet I also worried that speaking up would get me into trouble while the family was trying to work out a trust.",
        "Family members were already upset over my earlier statements that blocking contact was illegal, and framed my concerns as though I were threatening to sue my 94-year-old mother—which was never true. My concern was strictly reporting third-party interference that cut off communication between my mother and me."
      ];
    }
}

globalThis.OpusQ2NarrativeContent = OpusQ2NarrativeContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusQ2NarrativeContent;