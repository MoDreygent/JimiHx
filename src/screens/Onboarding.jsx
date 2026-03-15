import React, { useState } from 'react';
import { t } from '../locales.js';
import '../styles/Onboarding.css';

// ── Welcome screen ──────────────────────────────────────────────────────────
function WelcomeScreen({ lang, setLang, onDone }) {
  return (
    <div className="ob-screen ob-welcome">
      <div className="ob-lang-toggle">
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
        >EN</button>
        <button
          className={lang === 'pt' ? 'active' : ''}
          onClick={() => setLang('pt')}
        >PT</button>
      </div>

      <div className="ob-welcome-content">
        <div className="ob-logo">
          <span className="ob-logo-jimi">Jimi</span>
          <span className="ob-logo-hx">Hx</span>
        </div>
        <p className="ob-subtitle">{t(lang, 'welcome_subtitle')}</p>
      </div>

      <button className="ob-cta" onClick={onDone}>
        {t(lang, 'welcome_cta')}
      </button>
    </div>
  );
}

// ── Disclaimer screen ────────────────────────────────────────────────────────
function DisclaimerScreen({ lang, onDone }) {
  const [agreed, setAgreed] = useState(false);
  const items = t(lang, 'disclaimer_items');

  return (
    <div className="ob-screen ob-disclaimer">
      <h1 className="ob-title">{t(lang, 'disclaimer_title')}</h1>

      <ul className="ob-disclaimer-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <label className="ob-checkbox-row">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <span>{t(lang, 'disclaimer_checkbox')}</span>
      </label>

      <button
        className="ob-cta"
        disabled={!agreed}
        onClick={onDone}
      >
        {t(lang, 'disclaimer_cta')}
      </button>
    </div>
  );
}

// ── Age Input screen ─────────────────────────────────────────────────────────
function AgeInputScreen({ lang, onSubmit }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const age = parseInt(value, 10);
    if (!value || isNaN(age) || age < 7 || age > 12) {
      setError(true);
      return;
    }
    setError(false);
    onSubmit(age);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError(false);
  };

  return (
    <div className="ob-screen ob-age">
      <h1 className="ob-title">{t(lang, 'age_title')}</h1>
      <p className="ob-age-label">{t(lang, 'age_label')}</p>

      <input
        className={`ob-age-input${error ? ' ob-age-input--error' : ''}`}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        min="7"
        max="12"
        placeholder={t(lang, 'age_placeholder')}
        value={value}
        onChange={handleChange}
      />

      {error && (
        <p className="ob-age-error">{t(lang, 'age_error')}</p>
      )}

      <button className="ob-cta" onClick={handleSubmit}>
        {t(lang, 'age_cta')}
      </button>
    </div>
  );
}

// ── Main Onboarding component ────────────────────────────────────────────────
export default function Onboarding({
  phase, lang, setLang,
  onWelcomeDone, onDisclaimerDone, onAgeSubmit,
}) {
  if (phase === 'welcome') {
    return (
      <WelcomeScreen
        lang={lang}
        setLang={setLang}
        onDone={onWelcomeDone}
      />
    );
  }
  if (phase === 'disclaimer') {
    return (
      <DisclaimerScreen
        lang={lang}
        onDone={onDisclaimerDone}
      />
    );
  }
  if (phase === 'age_input') {
    return (
      <AgeInputScreen
        lang={lang}
        onSubmit={onAgeSubmit}
      />
    );
  }
  return null;
}
