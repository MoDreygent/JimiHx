import React, { useState } from 'react';
import { t } from '../locales.js';

// ─────────────────────────────────────────────────────────────────────────────
// JH.0 — GATE
//
// Two fields. Age picks the report template (8–15 vs 16+); email receives it.
// No time limit here. Once READY TO LAND is pressed there is no way back —
// the button locks to LANDING and the run begins.
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function GateScreen({ lang, onReady }) {
  const [age, setAge]         = useState('');
  const [email, setEmail]     = useState('');
  const [landing, setLanding] = useState(false);

  const ageNum   = parseInt(age, 10);
  const ageOk    = Number.isInteger(ageNum) && ageNum >= 8 && ageNum <= 99;
  const emailOk  = EMAIL_RE.test(email.trim());
  const ready    = ageOk && emailOk;

  const land = () => {
    if (!ready || landing) return;
    setLanding(true);
    setTimeout(() => onReady({ age: ageNum, email: email.trim() }), 900);
  };

  return (
    <div className="gate">
      <h1 className="gate-logo">JimiHx</h1>

      <div className="gate-fields">
        <input
          className="gate-input"
          type="number"
          inputMode="numeric"
          placeholder={t(lang, 'gate_age')}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={landing}
        />
        <input
          className="gate-input"
          type="email"
          inputMode="email"
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={t(lang, 'gate_email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={landing}
        />
      </div>

      {ready && (
        <button
          className={`gate-btn ${landing ? 'is-landing' : ''}`}
          onClick={land}
          disabled={landing}
        >
          {t(lang, landing ? 'gate_landing' : 'gate_ready')}
        </button>
      )}
    </div>
  );
}
