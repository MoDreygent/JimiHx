import React from 'react';

/**
 * Alien hero for Scene 1 — no hat, no sunglasses.
 * Idle blink animation via CSS class.
 * viewBox: 0 0 120 200
 */
export default function AlienHero({ blinking }) {
  return (
    <svg
      viewBox="0 0 120 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Left antenna */}
      <line x1="44" y1="22" x2="30" y2="2" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="2" r="5" fill="#4caf50" />
      {/* Right antenna */}
      <line x1="76" y1="22" x2="90" y2="2" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" />
      <circle cx="90" cy="2" r="5" fill="#4caf50" />

      {/* Head */}
      <ellipse cx="60" cy="46" rx="38" ry="38" fill="#4caf50" />
      <ellipse cx="48" cy="34" rx="10" ry="8" fill="#66bb6a" opacity="0.4" />

      {/* Eyes — large, curious */}
      <ellipse cx="44" cy="46" rx="11" ry={blinking ? 1 : 12} fill="#fff" style={{ transition: 'ry 0.1s' }} />
      <ellipse cx="76" cy="46" rx="11" ry={blinking ? 1 : 12} fill="#fff" style={{ transition: 'ry 0.1s' }} />
      {!blinking && (
        <>
          <circle cx="44" cy="48" r="6" fill="#1a237e" />
          <circle cx="76" cy="48" r="6" fill="#1a237e" />
          <circle cx="46" cy="45" r="2" fill="#fff" />
          <circle cx="78" cy="45" r="2" fill="#fff" />
        </>
      )}

      {/* Mouth — slightly open, curious */}
      <path d="M 48 66 Q 60 72 72 66" stroke="#2e7d32" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="52" y="82" width="16" height="8" rx="2" fill="#4caf50" />

      {/* White t-shirt */}
      <rect x="28" y="88" width="64" height="52" rx="8" fill="#f5f5f5" />
      <path d="M 46 88 Q 60 102 74 88" stroke="#e0e0e0" strokeWidth="2" fill="none" />

      {/* Arms */}
      <rect x="8" y="90" width="22" height="38" rx="8" fill="#4caf50" />
      <rect x="90" y="90" width="22" height="38" rx="8" fill="#4caf50" />
      <ellipse cx="19" cy="130" rx="10" ry="9" fill="#4caf50" />
      <ellipse cx="101" cy="130" rx="10" ry="9" fill="#4caf50" />

      {/* Blue jeans */}
      <rect x="30" y="138" width="60" height="44" rx="4" fill="#1565c0" />
      <line x1="60" y1="141" x2="60" y2="182" stroke="#0d47a1" strokeWidth="2" />
      <rect x="30" y="137" width="60" height="6" rx="2" fill="#5d4037" />
      <rect x="54" y="137" width="12" height="7" rx="1" fill="#ffd54f" />

      {/* Legs */}
      <rect x="31" y="180" width="24" height="14" rx="4" fill="#1565c0" />
      <rect x="65" y="180" width="24" height="14" rx="4" fill="#1565c0" />

      {/* Red sneakers */}
      <rect x="26" y="191" width="32" height="9" rx="4" fill="#e53935" />
      <rect x="22" y="195" width="36" height="5" rx="3" fill="#c62828" />
      <line x1="28" y1="193" x2="55" y2="193" stroke="#fff" strokeWidth="1" opacity="0.5" />

      <rect x="62" y="191" width="32" height="9" rx="4" fill="#e53935" />
      <rect x="62" y="195" width="36" height="5" rx="3" fill="#c62828" />
      <line x1="64" y1="193" x2="91" y2="193" stroke="#fff" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
