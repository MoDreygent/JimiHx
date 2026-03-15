import React, { useEffect, useState } from 'react';
import '../styles/OpeningSequence.css';

/*
 * Opening sequence timing (total ~7-8s):
 *   0ms       — Frame 1: white screen
 *   500ms     — Frame 2: alien enters from right, moonwalks left
 *   4200ms    — Frame 3: hat detaches and fills screen → black
 *   5700ms    — Frame 4: black screen "eyelids" open revealing classroom
 *   7000ms    — onDone() fires → Scene 1 begins
 */

// ── SVG: Hat (standalone for throw animation) ───────────────────────────────
function Hat({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 80 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brim */}
      <ellipse cx="40" cy="42" rx="38" ry="8" fill="#1a1a1a" />
      {/* Crown */}
      <rect x="18" y="10" width="44" height="32" rx="4" fill="#111" />
      {/* Hat band */}
      <rect x="18" y="34" width="44" height="6" rx="1" fill="#c0392b" />
      {/* Highlight */}
      <ellipse cx="32" cy="18" rx="8" ry="3" fill="#333" opacity="0.4" />
    </svg>
  );
}

// ── SVG: Alien Mascot (with hat + sunglasses) ────────────────────────────────
function AlienMascot() {
  return (
    <svg
      className="alien-mascot"
      viewBox="0 0 120 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left antenna */}
      <line x1="42" y1="30" x2="30" y2="5" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="5" r="5" fill="#4caf50" />
      {/* Right antenna */}
      <line x1="78" y1="30" x2="90" y2="5" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" />
      <circle cx="90" cy="5" r="5" fill="#4caf50" />

      {/* Head */}
      <ellipse cx="60" cy="52" rx="38" ry="42" fill="#4caf50" />
      {/* Head highlight */}
      <ellipse cx="48" cy="38" rx="10" ry="8" fill="#66bb6a" opacity="0.5" />

      {/* Hat on head */}
      <ellipse cx="60" cy="18" rx="42" ry="9" fill="#1a1a1a" />
      <rect x="24" y="0" width="72" height="20" rx="4" fill="#111" />
      <rect x="24" y="14" width="72" height="6" rx="1" fill="#c0392b" />

      {/* Sunglasses */}
      <rect x="30" y="50" width="22" height="12" rx="4" fill="#1a1a1a" />
      <rect x="68" y="50" width="22" height="12" rx="4" fill="#1a1a1a" />
      <line x1="52" y1="56" x2="68" y2="56" stroke="#1a1a1a" strokeWidth="3" />
      {/* Sunglass shine */}
      <rect x="32" y="52" width="6" height="3" rx="1" fill="#555" opacity="0.6" />
      <rect x="70" y="52" width="6" height="3" rx="1" fill="#555" opacity="0.6" />

      {/* Mouth (smile) */}
      <path d="M 46 72 Q 60 82 74 72" stroke="#2e7d32" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="52" y="90" width="16" height="10" rx="2" fill="#4caf50" />

      {/* Body / White t-shirt */}
      <rect x="30" y="98" width="60" height="55" rx="8" fill="#f5f5f5" />
      {/* T-shirt collar */}
      <path d="M 48 98 Q 60 112 72 98" stroke="#e0e0e0" strokeWidth="2" fill="none" />

      {/* Arms */}
      {/* Left arm (back) */}
      <rect x="10" y="100" width="22" height="40" rx="8" fill="#4caf50" />
      {/* Right arm */}
      <rect x="88" y="100" width="22" height="40" rx="8" fill="#4caf50" />
      {/* Hands */}
      <ellipse cx="21" cy="142" rx="10" ry="9" fill="#4caf50" />
      <ellipse cx="99" cy="142" rx="10" ry="9" fill="#4caf50" />

      {/* Jeans (blue) */}
      <rect x="32" y="150" width="56" height="50" rx="4" fill="#1565c0" />
      {/* Jeans seam */}
      <line x1="60" y1="153" x2="60" y2="200" stroke="#0d47a1" strokeWidth="2" />
      {/* Belt */}
      <rect x="32" y="149" width="56" height="6" rx="2" fill="#5d4037" />
      <rect x="54" y="149" width="12" height="7" rx="1" fill="#ffd54f" />

      {/* Left leg */}
      <rect x="33" y="198" width="23" height="16" rx="4" fill="#1565c0" />
      {/* Right leg */}
      <rect x="64" y="198" width="23" height="16" rx="4" fill="#1565c0" />

      {/* Left sneaker (red) */}
      <rect x="28" y="210" width="30" height="10" rx="5" fill="#e53935" />
      <rect x="24" y="214" width="34" height="6" rx="3" fill="#c62828" />
      <line x1="30" y1="212" x2="55" y2="212" stroke="#fff" strokeWidth="1" opacity="0.5" />

      {/* Right sneaker (red) */}
      <rect x="62" y="210" width="30" height="10" rx="5" fill="#e53935" />
      <rect x="62" y="214" width="34" height="6" rx="3" fill="#c62828" />
      <line x1="64" y1="212" x2="89" y2="212" stroke="#fff" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// ── Main Opening Sequence ────────────────────────────────────────────────────
export default function OpeningSequence({ onDone }) {
  const [frame, setFrame] = useState(0);
  // frame 0: white
  // frame 1: alien moonwalk (alien enters from right)
  // frame 2: hat throw → screen fills black
  // frame 3: eyelid opening → classroom visible

  useEffect(() => {
    const t1 = setTimeout(() => setFrame(1), 500);      // start moonwalk
    const t2 = setTimeout(() => setFrame(2), 4200);     // hat throw
    const t3 = setTimeout(() => setFrame(3), 5700);     // eye opening
    const t4 = setTimeout(() => onDone(), 7200);         // done

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <div className="opening-root">
      {/* ── Frame 0 & 1: White background ── */}
      <div className={`opening-white ${frame >= 2 ? 'opening-white--hidden' : ''}`} />

      {/* ── Frame 1: Alien moonwalk ── */}
      {frame === 1 && (
        <div className="alien-walk-container">
          <AlienMascot />
        </div>
      )}

      {/* ── Frame 2: Hat throw (hat detaches and fills screen) ── */}
      {frame === 2 && (
        <>
          <div className="opening-black" />
          <Hat className="hat-throw" />
        </>
      )}

      {/* ── Frame 3: Eyelid opening ── */}
      {frame === 3 && (
        <div className="eye-container">
          {/* Classroom visible behind the eyelids */}
          <div className="eye-classroom-bg" />
          {/* Top eyelid */}
          <div className="eyelid eyelid--top" />
          {/* Bottom eyelid */}
          <div className="eyelid eyelid--bottom" />
        </div>
      )}
    </div>
  );
}
