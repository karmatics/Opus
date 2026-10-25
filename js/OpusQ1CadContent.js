class OpusQ1CadContent {
  static getMeta() {
    return {
      kicker: 'Quadrant I • Spatial Inventions',
      title: '1. Inventions & Spatial CAD (CadPlan, accuCad, accudraw)',
      subtitle: '30-year proven AccuDraw floating 3D kinetic compass, SmartLine chaining, on-curve splines, and expired US Patent #5,754,182.'
    };
  }

  static manifest() {
    return [
      {
        section: 'q1_overview',
        partLabel: 'Quadrant I • Foundations',
        title: 'The AccuDraw Spatial Drafting Moat',
        blocks: [
          { id: 'p_q1_summary_1', type: 'p' },
          { id: 'sidebar_q1_tech', type: 'sidebar', kicker: 'Technical Invariants', title: 'AccuDraw & SmartLine Mathematical Core' }
        ]
      }
    ];
  }

  static p_q1_summary_1() {
    return [
      "In the mid-1990s, while at Bentley Systems, I created **AccuDraw**, **SmartLine**, and **PowerSelector**. Prior to AccuDraw, drafting on computers was an exercise in frustration: users typed coordinate strings (`DX=10.5`, `@5<45`) or drew disposable scratch lines.",
      "AccuDraw replaced this with a **floating kinetic coordinate compass** directly under the cursor that evaluated mouse motion, locked axes with single keystrokes without the Enter key, and allowed instant 3D plane rotations (`T` for Top, `F` for Front, `S` for Side, `V` for View). This invention became Bentley's first issued patent (US Patent #5,754,182) and anchored over $5.0B in enterprise value.",
      "Today, with patents expired, we are democratizing this technology through open web standards, pairing it with CADCraft (clean-room pure-Rust AutoCAD architecture) and wireless mobile touch controllers."
    ];
  }

  static sidebar_q1_tech() {
    return [
      "Quadrant I Technical Core:\n" +
      "• 3x3 Direction Cosines: `ThreeAxes` (X, Y, Z unit basis) with non-flipping Gram-Schmidt alignment.\n" +
      "• 50ms Chorded Tentative Snap: Model-space perpendicular projection dropping 90° normals to locked trajectories.\n" +
      "• SmartLine Two-Phase Arcs: Phase 1 (Center with dashed circle), Phase 2 (Sweep committing DXF bulge tan(θ/4)).\n" +
      "• On-Curve Spline Relaxation (`UpdateControlPoints.js`): 8-iteration G1 tangent solver without off-curve handles.\n" +
      "• Kinetic String-Drag (Tether): Low-pass mechanical filtering using Ctrl (stretch) and Shift (undo backtrack).\n" +
      "• Primary Repositories: `CadPlan`, `accuCad`, `accudraw`."
    ];
  }
}

globalThis.OpusQ1CadContent = OpusQ1CadContent;
if (typeof module !== 'undefined' && module.exports) module.exports = OpusQ1CadContent;