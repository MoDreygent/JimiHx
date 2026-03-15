import React from 'react';

/**
 * Girl hero — yellow skin, brown hair, blue outfit, red sneakers.
 * Props:
 *   kicking: boolean — plays soccer kick animation (handled via CSS class on parent)
 */
export default function GirlHero({ kicking }) {
  return (
    <svg
      viewBox="0 0 120 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Hair — back layer */}
      <ellipse cx="60" cy="30" rx="36" ry="30" fill="#5d4037" />
      <ellipse cx="60" cy="58" rx="10" ry="12" fill="#5d4037" />

      {/* Head */}
      <ellipse cx="60" cy="38" rx="30" ry="34" fill="#ffcd3c" />
      {/* Face highlight */}
      <ellipse cx="50" cy="28" rx="8" ry="6" fill="#ffd54f" opacity="0.5" />

      {/* Hair — front top */}
      <ellipse cx="60" cy="12" rx="30" ry="16" fill="#5d4037" />
      {/* Ponytail */}
      <ellipse cx="60" cy="4" rx="12" ry="8" fill="#5d4037" />
      {/* Hair tie */}
      <ellipse cx="60" cy="12" rx="6" ry="4" fill="#e53935" />

      {/* Eyes */}
      <ellipse cx="48" cy="38" rx="5" ry="6" fill="#fff" />
      <ellipse cx="72" cy="38" rx="5" ry="6" fill="#fff" />
      <circle cx="49" cy="39" r="3" fill="#3e2723" />
      <circle cx="73" cy="39" r="3" fill="#3e2723" />
      <circle cx="50" cy="37" r="1" fill="#fff" />
      <circle cx="74" cy="37" r="1" fill="#fff" />
      {/* Eyelashes */}
      <line x1="43" y1="33" x2="45" y2="30" stroke="#5d4037" strokeWidth="1.5" />
      <line x1="67" y1="33" x2="69" y2="30" stroke="#5d4037" strokeWidth="1.5" />
      <line x1="76" y1="33" x2="78" y2="30" stroke="#5d4037" strokeWidth="1.5" />

      {/* Smile */}
      <path d="M 50 52 Q 60 60 70 52" stroke="#e65100" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="42" cy="50" rx="7" ry="5" fill="#ff8a65" opacity="0.35" />
      <ellipse cx="78" cy="50" rx="7" ry="5" fill="#ff8a65" opacity="0.35" />

      {/* Neck */}
      <rect x="53" y="70" width="14" height="8" rx="2" fill="#ffcd3c" />

      {/* Blue outfit / dress */}
      <rect x="28" y="76" width="64" height="54" rx="10" fill="#1976d2" />
      {/* Collar */}
      <path d="M 46 76 Q 60 90 74 76" stroke="#1565c0" strokeWidth="2" fill="none" />
      {/* Dress bottom flare */}
      <path d="M 28 118 Q 60 132 92 118" fill="#1976d2" />

      {/* Arms */}
      <rect x="7" y="78" width="23" height="36" rx="8" fill="#1976d2" />
      <rect x="90" y="78" width="23" height="36" rx="8" fill="#1976d2" />
      <ellipse cx="18" cy="116" rx="10" ry="9" fill="#ffcd3c" />
      <ellipse cx="102" cy="116" rx="10" ry="9" fill="#ffcd3c" />

      {/* Legs */}
      <rect x="34" y="128" width="22" height="42" rx="6" fill="#ffcd3c" />
      <rect x="64" y="128" width="22" height="42" rx="6" fill="#ffcd3c" />

      {/* Left sneaker — red */}
      <rect x="28" y="166" width="30" height="10" rx="5" fill="#e53935" />
      <rect x="24" y="170" width="34" height="6" rx="3" fill="#c62828" />
      <line x1="30" y1="168" x2="55" y2="168" stroke="#fff" strokeWidth="1" opacity="0.5" />

      {/* Right sneaker — red */}
      <rect x="62" y="166" width="30" height="10" rx="5" fill="#e53935" />
      <rect x="62" y="170" width="34" height="6" rx="3" fill="#c62828" />
      <line x1="64" y1="168" x2="89" y2="168" stroke="#fff" strokeWidth="1" opacity="0.5" />

      {/* Soccer ball (shown when kicking) */}
      {kicking && (
        <g transform="translate(10, 60)">
          <circle cx="0" cy="0" r="18" fill="#fff" stroke="#333" strokeWidth="2" />
          <polygon points="0,-10 9,7 -9,7" fill="#333" />
          <polygon points="0,10 -9,-7 9,-7" fill="#fff" />
        </g>
      )}
    </svg>
  );
}
