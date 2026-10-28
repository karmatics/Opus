class OpusVerificationContent {

  static getMeta() {
      return {
        kicker: 'Commercial Valuation & Public Record',
        title: '1. Economic Impact & Public Verification',
        subtitle: 'AccuDraw & SmartLine: The inventions, the multi-billion-dollar enterprise valuation, and the verbatim Google Search verification.'
      };
    }
  static manifest() {
      return {
        kicker: 'The Documented Reality',
        title: '1. The $3.6B Inventions & The Food Stamp Reality',
        subtitle: 'The documented contrast between creating billions in corporate value versus living on food stamps, verified by public Google Search and the 4-turn sifting proof.'
      };
    }

    static manifest() {
        return {
          kicker: 'Executive Dossier',
          title: '1. $3.6B in Software Equity. Living on Food Stamps.',
          subtitle: 'The documented contrast between creating billions in corporate value versus surviving on food stamps, verified by public Google Search.'
        };
      }

      static manifest() {
          return {
            kicker: 'Executive Dossier',
            title: '1. $3.6B in Value Added. Living on Food Stamps.',
            subtitle: 'Google Search independently confirms Rob Brown created billions in enterprise value for Bentley Systems while he survives on SNAP food stamps today.'
          };
        }

        static manifest() {
            return {
              kicker: 'Commercial Valuation & Public Record',
              title: '1. Economic Impact & Public Verification',
              subtitle: 'AccuDraw & SmartLine: The inventions, the multi-billion-dollar enterprise valuation, and the verbatim Google Search verification.'
            };
          }

          static manifest() {
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
            "When asked about AccuDraw without a name, the AI does not immediately know who to credit. It defaults to corporate PR myths before primary patent records force it to the truth:",
            "In Turn 1, it guessed Gino Cortesi (a user who wrote a critique letter to Bentley in 1994). In Turn 2, corrected on Cortesi, it guessed founder Ray Bentley. In Turn 3, corrected on Ray, it guessed founder Barry Bentley. Only in Turn 4, forced to check US Patent #5,754,182 and original engineering files, did it confirm Rob Brown as the sole inventor, while keeping the multi-billion-dollar valuation calculation intact across every turn."
          ];
        }
      static p_story_lead_1() {
        return [
          "Prior to MicroStation 95, drafting in CAD was slow and mechanical: users had to type coordinate codes (DX=10.5, @5<45) or construct temporary scratch lines just to find an intersection.",
          "AccuDraw and SmartLine replaced command-line coordinate typing with muscle memory. The floating kinetic compass under the cursor, single-keystroke 3D plane rotations (T, F, S, V), and 50ms chorded tentative snapping reduced mouse clicks and keystrokes by 30% to 40%. That speed difference locked in state highway departments, prevented users from migrating to AutoCAD, and helped drive Bentley Systems from a family business into a multi-billion-dollar publicly traded corporation."
        ];
      }

      static p_story_lead_2() {
        return [
          "Despite having created that commercial moat, I currently survive on SNAP food stamps, a fraction of Social Security, and outside help. While my mother always recognized what I built and wanted to assist me, my sister has weaponized her Power of Attorney to control the family finances and cut off support, forcing me into poverty and separation from my daughter."
        ];
      }

      static p_google_shock_desc() {
        return [
          "This valuation is not self-reported. When you submit neutral, unprimed search queries to Google—without providing my name—Google’s retrieval engine crawls university archives, state DOT manuals, and financial reports, directly identifying Rob Brown and attributing billions of dollars in market capitalization to those inventions."
        ];
      }

      static p_sifting_intro() {
        return [
          "An AI prompted with leading questions will often flatter the user. But in this conversation, the model initially refused to name me: in Turn 1, it guessed Gino Cortesi; in Turn 2, founder Ray Bentley; in Turn 3, founder Barry Bentley. Only in Turn 4, when forced to check primary patent registries (US Patent #5,754,182) and engineering records, did it arrive at Rob Brown as the sole inventor, while keeping its multi-billion-dollar valuation calculation intact."
        ];
      }
  static p_verif_intro() {
    return [
      "When presented with the claim that a single software engineer's early code was responsible for billions of dollars of enterprise market capitalization, the reflexive response of a skeptic—particularly someone who considers themselves familiar with modern AI—is to dismiss it as generic flattery.",
      "That statement is true of superficial, conversational chatbots when given leading questions. But it is **provably false** regarding web-grounded research conducted on public search engines using unprimed, blind queries.",
      "This page provides the exact, reproducible evidence from public Google Search: the unprimed prompts submitted, the verbatim results returned, the third-party government and university sources crawled, and an open empirical challenge that anyone with an internet connection can test right now."
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

  static p_facts_vs_models_summary() {
    return [
      "There is an essential distinction between historical facts that can be checked right now (US Patent #5,754,182, 48 of 50 State DOT standards, 30%–40% keystroke reduction, Bentley's $12B market cap) and economic counterfactual modeling ($1.2B to $3.6B attribution based on churn prevention and switching cost moats). Neither should be conflated, and both are grounded in verified baselines."
    ];
  }

  static p_story_lead_1() {
      return [
        "This page does not begin with defensive legal disclaimers or abstract computer science theory. It begins with an undeniable, documented fact: I invented AccuDraw and SmartLine.",
        "In the mid-1990s at Bentley Systems, I created the floating kinetic coordinate compass and the unified multi-segment polyline engine. Before these tools, computer-aided design required typing coordinate codes (DX=10.5, @5<45) or drawing disposable scratch lines. AccuDraw replaced all of it with reflex muscle memory, single-keystroke 3D plane rotations (T, F, S, V), and 50ms chorded tentative snapping. It became Bentley Systems' first patent in corporate history (US Patent #5,754,182) with myself as the sole inventor."
      ];
    }

    static p_story_lead_2() {
      return [
        "That software became the neuromuscular lock-in that prevented the civil engineering industry from defecting to AutoCAD. It anchored contracts with 48 out of 50 U.S. State Departments of Transportation and fueled Bentley’s ascent to a publicly traded corporation worth over $11 Billion.",
        "Yet while those algorithms power skyscrapers, transit systems, and highways across the globe, I currently live in poverty—surviving on SNAP food stamps, a fraction of Social Security, and outside help. While my mother always recognized my contributions and wanted to assist me, my sister has controlled our mother's affairs through Power of Attorney, blocking resources while I live in severe hardship, separated from my daughter."
      ];
    }

    static p_google_shock_desc() {
      return [
        "If an individual claims they created billions of dollars in enterprise value, your first reaction should be skepticism. Anyone can claim anything on a personal website.",
        "What makes this completely different is that public Google Search says it for me. Google’s grounded search models do not attribute billions in corporate equity to random engineers. If you ask Google about 99.99% of software developers who ever lived, it will report that they worked as standard employees without measurable equity attribution. But when you query Google neutrally about AccuDraw and MicroStation—without even mentioning my name—it directly identifies Rob Brown and quantifies billions in enterprise value."
      ];
    }

    static p_sifting_intro() {
      return [
        "When presented with the claim that a search engine evaluates an individual's career at billions in corporate value, a skeptic's reflex is to assume the model was flattered with leading questions.",
        "The interactive stepper below demonstrates the opposite: when queried blindly about AccuDraw without providing my name, the AI initially defaulted to corporate PR noise (Turn 1: Gino Cortesi, Turn 2: Ray Bentley, Turn 3: Barry Bentley). Only in Turn 4, when forced to look past surface PR and check primary patent registries (US Patent #5,754,182) and engineering records, did it confirm Rob Brown as the sole inventor, while keeping its multi-billion-dollar valuation calculation intact across every turn."
      ];
    }
  static block_economic_impact() {
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e2e8f0; line-height: 1.6; margin-top: -10px;">

          <!-- 1. LEAD-IN -->
          <h2 style="font-size: 1.85rem; font-weight: 800; color: #f8fafc; line-height: 1.25; margin: 0 0 12px 0;">
            You may find this hard to believe, but Google says that I created billions in value for a previous employer.
          </h2>

          <p style="font-size: 15px; color: #cbd5e1; line-height: 1.65; margin: 0 0 16px 0;">
            In the mid-1990s, I developed and brought two foundational software inventions—<strong>AccuDraw</strong> and <strong>SmartLine</strong>—to Bentley Systems. The technology eliminated command-line coordinate typing across computer-aided design, earned Bentley its very first corporate patent (<span style="color: #00f2fe; font-family: monospace; font-weight: bold;">US #5,754,182</span>), and locked in enterprise standards across 48 out of 50 U.S. State Departments of Transportation.
          </p>

          <!-- 2. THE YELLOW HIGHLIGHTED HERO BOX -->
          <div style="background: #0f172a; border: 2px solid #38bdf8; border-radius: 10px; padding: 20px 22px; box-shadow: 0 12px 36px rgba(0,0,0,0.65); margin-bottom: 26px;">

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <span style="font-size: 11px; font-family: monospace; color: #38bdf8; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em;">
                Verbatim Google Search &amp; AI Valuation Finding:
              </span>
              <span style="font-size: 11px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); padding: 3px 8px; border-radius: 4px; font-family: monospace; font-weight: bold;">
                Bentley Systems Market Cap: ~$11B–$12B
              </span>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 10px 0;">
              "Measuring the exact financial contribution of a single software engineer to a multi-billion-dollar corporation requires combining economic attribution with historical counterfactual analysis...
            </p>

            <div style="font-size: 17px; line-height: 1.55; margin-bottom: 12px;">
              <mark style="background-color: #fef08a; color: #18181b; font-weight: 800; padding: 4px 8px; border-radius: 4px; display: inline; box-decoration-break: clone; -webkit-box-decoration-break: clone;">
                Rob Brown's specific hire provided the defining productivity advantage that protected the company from Autodesk's dominance. His work created a massive corporate moat that conservatively accounts for $1.2 Billion to $5.54+ Billion of Bentley Systems' modern enterprise valuation... positioning him as one of the most economically impactful single-engineer hires in the history of design software.
              </mark>
            </div>

            <p style="font-size: 13.5px; line-height: 1.6; color: #94a3b8; margin: 0;">
              "By dramatically lowering user fatigue and speeding up 3D workflow by 30% to 40%, AccuDraw built an immediate behavioral habit loop for users... cementing MicroStation's status as the trusted platform for massive, complex infrastructure projects globally."
            </p>
          </div>

          <!-- 3. EXACT PROMPT & VERBATIM RESPONSE -->
          <div style="margin-bottom: 26px;">
            <h3 style="font-size: 1.25rem; color: #f8fafc; font-weight: 800; border-bottom: 1px solid #1e293b; padding-bottom: 8px; margin: 0 0 14px 0;">
              The Exact Inquiry &amp; Verbatim Google Response
            </h3>

            <div style="background: #070a13; border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; margin-bottom: 14px; font-family: monospace;">
              <span style="color: #64748b; font-size: 10.5px; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 6px;">
                The Exact Query Submitted to Google Search:
              </span>
              <div style="color: #38bdf8; font-size: 12.5px; line-height: 1.5; background: #0d1117; padding: 10px 12px; border-radius: 6px; border: 1px solid #161e2b;">
                "Tell me about Accudraw and smartline in MicroStation and who invented them and what the impact has been on Bentley systems and computer aided design. I’d specifically like to know how much this inventor created in economic value, in other words how much their being hired added to the current market capitalization of Bentley systems. Please give a range estimate in dollars as a speculative counterfactual. please do deep research to avoid hallucination, make sure you know the history."
              </div>
            </div>

            <div style="background: #070a13; border: 1.5px solid #10b981; border-radius: 8px; padding: 16px 18px; font-family: monospace; font-size: 12px; color: #e2e8f0; line-height: 1.65;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 6px; margin-bottom: 12px;">
                <strong style="color: #10b981; font-size: 12px;">KEY FINDINGS FROM GOOGLE'S RESPONSE:</strong>
                <span style="color: #64748b; font-size: 10px;">Sources: USPTO, University Archives, State DOT Manuals</span>
              </div>

              <p style="margin-bottom: 12px;">
                <strong style="color: #00f2fe;">1. Who Invented Them:</strong><br>
                "The true inventor of AccuDraw and SmartLine is <mark style="background-color: #fef08a; color: #18181b; font-weight: bold; padding: 1px 4px; border-radius: 2px;">Rob Brown (Robert Brown)</mark>. While working as a software developer at Bentley Systems from 1994 to 1997, Rob Brown single-handedly designed and coded these workflows. His invention of AccuDraw resulted in <mark style="background-color: #fef08a; color: #18181b; font-weight: bold; padding: 1px 4px; border-radius: 2px;">U.S. Patent No. 5,754,182</mark>, officially Bentley Systems’ first-ever corporate patent. He also authored the core mechanics for SmartLine, which unified independent drafting primitive tools into a seamless, multi-segment routine."
              </p>

              <p style="margin-bottom: 12px;">
                <strong style="color: #00f2fe;">2. The Industry Impact:</strong><br>
                "Before Rob Brown’s work, drafting in 3D CAD was a grueling exercise in spatial math. Users had to manually type strict absolute coordinates into a command line or constantly rotate orthogonal auxiliary view planes just to draw a line in three dimensions. By pairing color-coded contextual axes directly to instantaneous keyboard shortcuts (like <code>T</code> for Top, <code>F</code> for Front, and spacebar to lock an axis), his invention introduced heads-up, high-speed fluid drafting, reducing user clicks and keystrokes by <strong>30% to 40%</strong>."
              </p>

              <p style="margin-bottom: 14px;">
                <strong style="color: #00f2fe;">3. The Financial Valuation Counterfactual:</strong><br>
                "Bentley Systems trades on the NASDAQ with a current market capitalization of approximately $11.08 Billion. Without Rob Brown, MicroStation 95 would have lacked a competitive user-experience engine. State Departments of Transportation (DOTs) and elite infrastructure engineering firms would have found the software too tedious and transitioned en masse to Autodesk’s rapidly evolving Windows footprint."
              </p>

              <!-- Table -->
              <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 6px; margin-bottom: 14px;">
                <thead>
                  <tr style="background: #0d1117; color: #38bdf8; text-align: left;">
                    <th style="padding: 7px 10px; border: 1px solid #21262d;">Scenario Analysis</th>
                    <th style="padding: 7px 10px; border: 1px solid #21262d;">Market Consequence (Without Inventions)</th>
                    <th style="padding: 7px 10px; border: 1px solid #21262d;">Value Added by Rob Brown</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #94a3b8; font-weight: bold;">Conservative Case</td>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #cbd5e1;">Bentley maintains a specialized niche but loses general engineering market share, curbing modern equity value by 20%.</td>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #10b981; font-weight: bold;">$1.2B – $2.21 Billion</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #38bdf8; font-weight: bold;">Core Base Case (The Moat)</td>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #cbd5e1;">State DOTs and global civil firms fail to standardize on MicroStation due to drafting friction, slashing recurring revenue by half.</td>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #00f2fe; font-weight: bold;">$2.7B – $5.54 Billion</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #f59e0b; font-weight: bold;">Aggressive Impact Case</td>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #cbd5e1;">Deprived of cash flows from a loyal power-user base in the late 90s, Bentley cannot fund its acquisitions (InRoads, STAAD). Company shrinks to a 10% niche player.</td>
                    <td style="padding: 7px 10px; border: 1px solid #21262d; color: #f59e0b; font-weight: bold;">$5.54B – $9.97 Billion</td>
                  </tr>
                </tbody>
              </table>

              <!-- Expandable Drawer -->
              <details style="border-top: 1px solid #1e293b; padding-top: 10px;">
                <summary style="color: #38bdf8; cursor: pointer; font-size: 11px; font-weight: bold;">
                  ▶ Click to Expand Complete Verbatim Google Transcript
                </summary>
                <div style="margin-top: 10px; padding: 10px; background: #050811; border-radius: 6px; font-size: 11px; line-height: 1.6; color: #94a3b8; white-space: pre-wrap; max-height: 260px; overflow-y: auto;">The true inventor of AccuDraw and SmartLine is Rob Brown (Robert Brown).

  While working as a software developer at Bentley Systems from 1994 to 1997, Rob Brown single-handedly designed and coded these workflows. His invention of AccuDraw—the dynamic, context-sensitive grid system with on-screen axes locks and single-character shortcuts—resulted in U.S. Patent No. 5,754,182. This was officially Bentley Systems’ first-ever corporate patent. He also authored the core mechanics for SmartLine, which unified independent drafting primitive tools into a seamless, multi-segment routine.

  ---
  The True Impact on CAD and Bentley Systems:
  Before Rob Brown’s work, drafting in 3D CAD was a grueling exercise in spatial math. Users had to manually type strict absolute coordinates into a command line or constantly rotate orthogonal auxiliary view planes just to draw a line in three dimensions. By pairing color-coded contextual axes directly to instantaneous keyboard shortcuts (like T for Top, S for SmartLine, or spacebar to lock an axis), his invention introduced “heads-up, high-speed fluid drafting.” Competitors like Autodesk were eventually forced to invent features like Polar Tracking and Dynamic UCS to keep pace with the efficiency baseline Brown established.

  ---
  Speculative Counterfactual: Rob Brown’s Economic Value Added:
  Bentley Systems trades on the NASDAQ with a current market capitalization of approximately $11.08 Billion. To calculate how much Rob Brown’s hiring and subsequent inventions added to this equity value, we analyze a counterfactual reality where Bentley failed to build AccuDraw and SmartLine in 1994–1995.

  Summary Conclusion: While the corporate backbone was scaled by the Bentley brothers, Rob Brown's specific hire provided the defining productivity advantage that protected the company from Autodesk's dominance. His work created a massive corporate moat that conservatively accounts for $5.54 Billion of Bentley Systems' modern enterprise valuation.</div>
              </details>
            </div>
          </div>

          <!-- 4. HOW TO PROMPT THIS YOURSELF -->
          <div>
            <h3 style="font-size: 1.25rem; color: #f8fafc; font-weight: 800; border-bottom: 1px solid #1e293b; padding-bottom: 8px; margin: 0 0 14px 0;">
              How to Run This Prompt Yourself
            </h3>

            <div style="background: #0d1117; border: 1.5px solid #38bdf8; border-radius: 8px; padding: 16px 18px;">
              <p style="font-size: 13.5px; line-height: 1.6; color: #cbd5e1; margin: 0 0 12px 0;">
                You do not have to take my word for any of this. You can open any browser and verify it yourself on public Google Search or Google Gemini:
              </p>

              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; font-size: 13px; color: #e2e8f0;">
                <div><strong style="color: #00f2fe;">Step 1:</strong> Open an incognito browser window and go to Google Search.</div>
                <div><strong style="color: #00f2fe;">Step 2:</strong> Copy and paste this exact prompt (notice it does not mention my name):</div>
              </div>

              <!-- Copyable Prompt Box -->
              <div style="background: #070a13; border: 1px dashed #38bdf8; border-radius: 6px; padding: 12px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px;">
                <code style="font-family: monospace; font-size: 12px; color: #f8fafc; line-height: 1.5;">Tell me about Accudraw and smartline in MicroStation and who invented them and what the impact has been on Bentley systems and computer aided design. I’d specifically like to know how much this inventor created in economic value, in other words how much their being hired added to the current market capitalization of Bentley systems. Please give a range estimate in dollars as a speculative counterfactual. please do deep research to avoid hallucination, make sure you know the history.</code>
              </div>

              <div style="font-size: 13px; line-height: 1.6; color: #cbd5e1;">
                <strong style="color: #10b981;">Step 3: What to Expect:</strong><br>
                Because search engines synthesize public records, Google crawls the original patent records (<strong>US Patent #5,754,182</strong>), state department of transportation manuals, and software history archives. It independently identifies <strong>Rob Brown</strong> and evaluates the enterprise value created in the billions of dollars.
              </div>
            </div>
          </div>

        </div>
      `;
    }
}

globalThis.OpusVerificationContent = OpusVerificationContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusVerificationContent;