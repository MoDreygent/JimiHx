import React, { useMemo } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CloudFrame — the comic thought-cloud that holds a question.
//
// Drawn as one merged silhouette: an inset rectangle plus overlapping circles
// around the perimeter, all filled white. The dark outline comes from a 4-way
// drop-shadow on the whole group, so no internal seams show between the bumps.
//
// Swap-out: when the painted PNG lands, replace the <svg> with an <img>.
// Nothing outside this file cares.
// ─────────────────────────────────────────────────────────────────────────────

const W = 200;
const H = 340;
const R = 17;          // base bump radius
const STEP = R * 1.45; // spacing between bump centres

// deterministic wobble so the edge reads hand-drawn, not machined
const wobble = (i) => 1 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.22;

function perimeterBumps() {
  const bumps = [];
  const inset = R * 0.9;
  let i = 0;

  const run = (from, to, fixed, axis) => {
    const span = to - from;
    const n = Math.max(2, Math.round(span / STEP));
    for (let k = 0; k <= n; k++) {
      const p = from + (span * k) / n;
      bumps.push({
        cx: axis === 'x' ? p : fixed,
        cy: axis === 'x' ? fixed : p,
        r: R * wobble(i++),
      });
    }
  };

  run(inset, W - inset, inset, 'x');       // top
  run(inset, W - inset, H - inset, 'x');   // bottom
  run(inset, H - inset, inset, 'y');       // left
  run(inset, H - inset, W - inset, 'y');   // right

  return bumps;
}

export default function CloudFrame({ children, className = '' }) {
  const bumps = useMemo(perimeterBumps, []);

  return (
    <div className={`cloudframe ${className}`}>
      <svg
        className="cloudframe-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g fill="#f4f8fb">
          <rect
            x={R * 0.6} y={R * 0.6}
            width={W - R * 1.2} height={H - R * 1.2}
            rx={R}
          />
          {bumps.map((b, i) => (
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} />
          ))}
        </g>
      </svg>

      <div className="cloudframe-inner">{children}</div>
    </div>
  );
}
