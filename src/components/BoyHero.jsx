import React from 'react';

/**
 * Boy hero — yellow skin, brown hair, pink shirt, black shorts, red sneakers.
 * Props:
 *   skating: boolean — plays skateboard trick (handled via CSS class on parent)
 */
export default function BoyHero({ skating }) {
  return (
    <svg
      viewBox="0 0 120 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Hair */}
      <ellipse cx="60" cy="26" rx="30" ry="20" fill="#5d4037" />
      {/* Hair side parts */}
      <path d="M 30 26 Q 32 10 60 8 Q 88 10 90 26" fill="#5d4037" />

      {/* Head */}
      <ellipse cx="60" cy="40" rx="30" ry="32" fill="#ffcd3c" />
      <ellipse cx="50" cy="28" rx="8" ry="6" fill="#ffd54f" opacity="0.5" />

      {/* Eyes */}
      <ellipse cx="48" cy="40" rx="5" ry="6" fill="#fff" />
      <ellipse cx="72" cy="40" rx="5" ry="6" fill="#fff" />
      <circle cx="49" cy="41" r="3" fill="#3e2723" />
      <circle cx="73" cy="41" r="3" fill="#3e2723" />
      <circle cx="50" cy="39" r="1" fill="#fff" />
      <circle cx="74" cy="39" r="1" fill="#fff" />

      {/* Eyebrows */}
      <path d="M 42 33 Q 49 30 55 33" stroke="#5d4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 65 33 Q 72 30 78 33" stroke="#5d4037" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Smile */}
      <path d="M 50 54 Q 60 62 70 54" stroke="#e65100" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="70" width="14" height="8" rx="2" fill="#ffcd3c" />

      {/* Pink shirt */}
      <rect x="28" y="76" width="64" height="48" rx="8" fill="#e91e8c" />
      <path d="M 46 76 Q 60 88 74 76" stroke="#c2185b" strokeWidth="2" fill="none" />

      {/* Arms */}
      <rect x="7" y="78" width="23" height="34" rx="8" fill="#e91e8c" />
      <rect x="90" y="78" width="23" height="34" rx="8" fill="#e91e8c" />
      <ellipse cx="18" cy="114" rx="10" ry="9" fill="#ffcd3c" />
      <ellipse cx="102" cy="114" rx="10" ry="9" fill="#ffcd3c" />

      {/* Black shorts */}
      <rect x="30" y="122" width="60" height="30" rx="4" fill="#212121" />
      <line x1="60" y1="124" x2="60" y2="152" stroke="#111" strokeWidth="2" />

      {/* Legs */}
      <rect x="34" y="150" width="22" height="30" rx="6" fill="#ffcd3c" />
      <rect x="64" y="150" width="22" height="30" rx="6" fill="#ffcd3c" />

      {/* Left sneaker — red */}
      <rect x="28" y="177" width="30" height="10" rx="5" fill="#e53935" />
      <rect x="24" y="181" width="34" height="6" rx="3" fill="#c62828" />
      <line x1="30" y1="179" x2="55" y2="179" stroke="#fff" strokeWidth="1" opacity="0.5" />

      {/* Right sneaker — red */}
      <rect x="62" y="177" width="30" height="10" rx="5" fill="#e53935" />
      <rect x="62" y="181" width="34" height="6" rx="3" fill="#c62828" />
      <line x1="64" y1="179" x2="89" y2="179" stroke="#fff" strokeWidth="1" opacity="0.5" />

      {/* Skateboard (shown when skating) */}
      {skating && (
        <g transform="translate(55, 155)">
          <rect x="-30" y="15" width="60" height="8" rx="4" fill="#8d6e63" />
          <circle cx="-20" cy="24" r="4" fill="#424242" />
          <circle cx="20" cy="24" r="4" fill="#424242" />
        </g>
      )}
    </svg>
  );
}
