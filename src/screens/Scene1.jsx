import React, { useState, useEffect, useRef } from 'react';
import AlienHero from '../components/AlienHero.jsx';
import GirlHero from '../components/GirlHero.jsx';
import BoyHero from '../components/BoyHero.jsx';
import { t } from '../locales.js';
import '../styles/Scene1.css';

const SCENE1_PHASES = {
  WALKIN: 'walkin',
  FEET: 'feet',
  SELECTION: 'selection',
  VICTORY: 'victory',
};

const CHARACTERS = ['girl', 'boy', 'alien'];

// ── Classroom SVG (first-person perspective) ─────────────────────────────────
function Classroom({ phase }) {
  return (
    <div className={`classroom-container ${phase === SCENE1_PHASES.WALKIN ? 'classroom--walkin' : 'classroom--seated'}`}>
      <svg
        className="classroom-svg"
        viewBox="0 0 400 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── Floor ── */}
        <rect x="0" y="360" width="400" height="240" fill="#c8b89a" />
        {/* Floor scuff marks */}
        <line x1="80" y1="420" x2="130" y2="415" stroke="#b0a080" strokeWidth="2" opacity="0.5" />
        <line x1="200" y1="450" x2="260" y2="445" stroke="#b0a080" strokeWidth="1.5" opacity="0.4" />
        <line x1="300" y1="390" x2="340" y2="400" stroke="#b0a080" strokeWidth="2" opacity="0.5" />

        {/* ── Back wall ── */}
        <rect x="0" y="0" width="400" height="360" fill="#e8e0d4" />
        {/* Wall texture lines */}
        <line x1="0" y1="180" x2="400" y2="180" stroke="#d0c8bc" strokeWidth="0.5" />

        {/* ── Ceiling ── */}
        <rect x="0" y="0" width="400" height="30" fill="#d4cec8" />

        {/* ── Fluorescent lights ── */}
        <rect x="80" y="5" width="100" height="18" rx="3" fill="#f5f5e8" />
        <rect x="80" y="5" width="100" height="18" rx="3" fill="rgba(255,255,200,0.4)" />
        <rect x="220" y="5" width="100" height="18" rx="3" fill="#f5f5e8" />
        <rect x="220" y="5" width="100" height="18" rx="3" fill="rgba(255,255,200,0.4)" />

        {/* ── Left wall (windows) ── */}
        <rect x="0" y="30" width="60" height="330" fill="#d4cec8" />
        {/* Window 1 */}
        <rect x="2" y="60" width="56" height="90" rx="2" fill="#87ceeb" />
        <rect x="2" y="60" width="56" height="90" rx="2" fill="rgba(135,206,235,0.7)" />
        {/* Late afternoon golden tint */}
        <rect x="2" y="60" width="56" height="90" rx="2" fill="rgba(255,200,80,0.15)" />
        {/* Window frame */}
        <rect x="2" y="60" width="56" height="90" rx="2" fill="none" stroke="#a09080" strokeWidth="2" />
        <line x1="30" y1="60" x2="30" y2="150" stroke="#a09080" strokeWidth="1.5" />
        <line x1="2" y1="105" x2="58" y2="105" stroke="#a09080" strokeWidth="1.5" />
        {/* Trees outside */}
        <ellipse cx="20" cy="68" rx="12" ry="10" fill="#66bb6a" opacity="0.7" />
        <ellipse cx="40" cy="64" rx="10" ry="12" fill="#4caf50" opacity="0.7" />
        {/* Window 2 */}
        <rect x="2" y="170" width="56" height="90" rx="2" fill="#87ceeb" />
        <rect x="2" y="170" width="56" height="90" rx="2" fill="rgba(255,200,80,0.15)" />
        <rect x="2" y="170" width="56" height="90" rx="2" fill="none" stroke="#a09080" strokeWidth="2" />
        <line x1="30" y1="170" x2="30" y2="260" stroke="#a09080" strokeWidth="1.5" />
        <line x1="2" y1="215" x2="58" y2="215" stroke="#a09080" strokeWidth="1.5" />
        {/* Water bottle on windowsill */}
        <rect x="8" y="155" width="10" height="18" rx="3" fill="#b3e5fc" opacity="0.8" />
        <rect x="10" y="153" width="6" height="4" rx="1" fill="#81d4fa" />

        {/* ── Right wall ── */}
        <rect x="340" y="30" width="60" height="330" fill="#d4cec8" />
        {/* Red door */}
        <rect x="342" y="120" width="56" height="120" rx="3" fill="#c62828" />
        <rect x="342" y="120" width="56" height="120" rx="3" fill="none" stroke="#b71c1c" strokeWidth="2" />
        <circle cx="354" cy="180" r="4" fill="#ffd54f" />

        {/* ── Chalkboard ── */}
        <rect x="80" y="35" width="260" height="140" rx="4" fill="#2e5940" />
        {/* Chalkboard frame */}
        <rect x="78" y="33" width="264" height="144" rx="5" fill="none" stroke="#8d6e63" strokeWidth="4" />
        {/* Ghost chalk marks — poorly erased */}
        <text x="100" y="80" fill="rgba(255,255,255,0.12)" fontSize="14" fontFamily="serif">2 + 2 = 4</text>
        <text x="130" y="100" fill="rgba(255,255,255,0.10)" fontSize="12" fontFamily="serif">HOMEWORK</text>
        <line x1="90" y1="140" x2="200" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <line x1="150" y1="120" x2="320" y2="125" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        {/* Chalk tray */}
        <rect x="78" y="177" width="264" height="8" rx="2" fill="#795548" />
        {/* Chalk dust */}
        <rect x="82" y="179" width="18" height="4" rx="1" fill="#e0e0e0" opacity="0.6" />
        <rect x="105" y="180" width="8" height="3" rx="1" fill="#e0e0e0" opacity="0.4" />
        {/* Chalk pieces */}
        <rect x="290" y="179" width="14" height="5" rx="2" fill="#fafafa" opacity="0.8" />
        <rect x="308" y="180" width="10" height="4" rx="2" fill="#fafafa" opacity="0.7" />

        {/* ── Back row desks (far away, small) ── */}
        {/* Desk back-left */}
        <rect x="70" y="225" width="80" height="50" rx="3" fill="#a1887f" />
        <rect x="70" y="270" width="80" height="5" rx="1" fill="#8d6e63" />
        {/* Desk legs */}
        <line x1="78" y1="275" x2="75" y2="310" stroke="#78909c" strokeWidth="5" strokeLinecap="round" />
        <line x1="142" y1="275" x2="145" y2="310" stroke="#78909c" strokeWidth="5" strokeLinecap="round" />
        {/* Chair (angled carelessly) */}
        <rect x="75" y="295" width="60" height="40" rx="3" fill="#90a4ae" transform="rotate(-5, 105, 315)" />
        <line x1="80" y1="330" x2="78" y2="365" stroke="#78909c" strokeWidth="4" strokeLinecap="round" transform="rotate(-5, 105, 315)" />
        <line x1="128" y1="330" x2="130" y2="365" stroke="#78909c" strokeWidth="4" strokeLinecap="round" transform="rotate(-5, 105, 315)" />

        {/* Desk back-right */}
        <rect x="250" y="225" width="80" height="50" rx="3" fill="#a1887f" />
        <rect x="250" y="270" width="80" height="5" rx="1" fill="#8d6e63" />
        <line x1="258" y1="275" x2="255" y2="310" stroke="#78909c" strokeWidth="5" strokeLinecap="round" />
        <line x1="322" y1="275" x2="325" y2="310" stroke="#78909c" strokeWidth="5" strokeLinecap="round" />
        <rect x="255" y="295" width="60" height="40" rx="3" fill="#90a4ae" />
        <line x1="260" y1="330" x2="258" y2="365" stroke="#78909c" strokeWidth="4" strokeLinecap="round" />
        <line x1="308" y1="330" x2="310" y2="365" stroke="#78909c" strokeWidth="4" strokeLinecap="round" />
        {/* Forgotten backpack */}
        <rect x="254" y="310" width="28" height="36" rx="6" fill="#1565c0" opacity="0.85" />
        <rect x="258" y="314" width="20" height="12" rx="3" fill="#1976d2" />
        <line x1="258" y1="326" x2="278" y2="326" stroke="#0d47a1" strokeWidth="1.5" />

        {/* Pencil on floor */}
        <rect x="165" y="385" width="50" height="5" rx="2" fill="#ffd54f" transform="rotate(-15, 190, 388)" />
        <polygon points="165,386 155,388 165,390" fill="#e65100" transform="rotate(-15, 190, 388)" />
        <rect x="213" y="384" width="6" height="5" rx="1" fill="#ef9a9a" transform="rotate(-15, 190, 388)" />

        {/* Crumpled paper ball */}
        <circle cx="270" cy="395" r="8" fill="#f5f5f5" />
        <path d="M 265 392 Q 270 395 275 390 Q 278 397 270 400 Q 263 396 265 392" fill="#e0e0e0" />

        {/* ── Middle row desk (center) ── */}
        <rect x="130" y="310" width="140" height="65" rx="4" fill="#a1887f" />
        <rect x="130" y="368" width="140" height="7" rx="2" fill="#8d6e63" />
        <line x1="140" y1="375" x2="137" y2="420" stroke="#78909c" strokeWidth="7" strokeLinecap="round" />
        <line x1="262" y1="375" x2="265" y2="420" stroke="#78909c" strokeWidth="7" strokeLinecap="round" />

        {/* ── Front desk (player's desk, close) ── */}
        <rect x="60" y="480" width="280" height="90" rx="5" fill="#bcaaa4" />
        <rect x="60" y="560" width="280" height="10" rx="2" fill="#a1887f" />
        {/* Desk surface detail */}
        <line x1="65" y1="490" x2="335" y2="490" stroke="#a1887f" strokeWidth="1" opacity="0.4" />
        <rect x="70" y="495" width="40" height="5" rx="2" fill="#a1887f" opacity="0.3" />

        {/* ── Chair at front desk (player's chair) ── */}
        <rect x="100" y="545" width="200" height="55" rx="5" fill="#90a4ae" />
        <line x1="110" y1="595" x2="108" y2="640" stroke="#78909c" strokeWidth="8" strokeLinecap="round" />
        <line x1="290" y1="595" x2="292" y2="640" stroke="#78909c" strokeWidth="8" strokeLinecap="round" />
      </svg>

      {/* Golden afternoon light overlay */}
      <div className="classroom-light-overlay" />
    </div>
  );
}

// ── Red sneakers (first-person feet view) ────────────────────────────────────
function RedSneakers() {
  return (
    <div className="sneakers-view">
      <svg
        viewBox="0 0 300 160"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Floor */}
        <rect x="0" y="90" width="300" height="70" fill="#c8b89a" />
        {/* Chair legs visible */}
        <rect x="20" y="30" width="14" height="130" rx="4" fill="#78909c" />
        <rect x="266" y="30" width="14" height="130" rx="4" fill="#78909c" />

        {/* Jeans (legs) */}
        <rect x="60" y="0" width="60" height="100" rx="8" fill="#1565c0" />
        <rect x="180" y="0" width="60" height="100" rx="8" fill="#1565c0" />

        {/* Left sneaker */}
        <rect x="42" y="88" width="90" height="32" rx="12" fill="#e53935" />
        <rect x="35" y="102" width="100" height="18" rx="9" fill="#c62828" />
        {/* Sole edge */}
        <rect x="32" y="112" width="105" height="8" rx="4" fill="#b71c1c" />
        {/* Laces */}
        <line x1="50" y1="93" x2="122" y2="93" stroke="#fff" strokeWidth="2" opacity="0.7" />
        <line x1="56" y1="98" x2="118" y2="98" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
        {/* Toe cap */}
        <ellipse cx="52" cy="100" rx="14" ry="8" fill="#c62828" opacity="0.5" />

        {/* Right sneaker */}
        <rect x="168" y="88" width="90" height="32" rx="12" fill="#e53935" />
        <rect x="165" y="102" width="100" height="18" rx="9" fill="#c62828" />
        <rect x="163" y="112" width="105" height="8" rx="4" fill="#b71c1c" />
        <line x1="178" y1="93" x2="250" y2="93" stroke="#fff" strokeWidth="2" opacity="0.7" />
        <line x1="182" y1="98" x2="244" y2="98" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
        <ellipse cx="248" cy="100" rx="14" ry="8" fill="#c62828" opacity="0.5" />
      </svg>
    </div>
  );
}

// ── Character on cloud ────────────────────────────────────────────────────────
function CharacterCloud({ character, selected, defeated, onSelect, lang }) {
  const [blinking, setBlinking] = useState(false);

  // Alien blink cycle
  useEffect(() => {
    if (character !== 'alien') return;
    const cycle = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    };
    const interval = setInterval(cycle, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [character]);

  const cloudClass = [
    'hero-cloud',
    selected ? 'hero-cloud--selected' : '',
    defeated ? 'hero-cloud--defeated' : '',
  ].join(' ');

  return (
    <div className={cloudClass} onClick={onSelect}>
      {/* Cloud shape */}
      <div className="cloud-shape">
        <div className="cloud-bump cloud-bump--1" />
        <div className="cloud-bump cloud-bump--2" />
        <div className="cloud-bump cloud-bump--3" />
        <div className="cloud-base" />
      </div>
      {/* Character */}
      <div className="cloud-character">
        {character === 'alien' && <AlienHero blinking={blinking} />}
        {character === 'girl' && <GirlHero />}
        {character === 'boy' && <BoyHero />}
      </div>
    </div>
  );
}

// ── Victory reactions ─────────────────────────────────────────────────────────
function VictoryReaction({ character, lang }) {
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimFrame(1), 200);
    const t2 = setTimeout(() => setAnimFrame(2), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="victory-reaction">
      <div className={`victory-character victory-character--${character} frame-${animFrame}`}>
        {character === 'alien' && (
          <>
            <AlienHero />
            <div className="victory-text">{t(lang, 'alien_reaction')}</div>
          </>
        )}
        {character === 'girl' && (
          <>
            <GirlHero kicking={animFrame >= 1} />
            {animFrame >= 1 && (
              <div className="victory-pow">{t(lang, 'girl_pow')}</div>
            )}
          </>
        )}
        {character === 'boy' && (
          <>
            <BoyHero skating={animFrame >= 1} />
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Scene 1 component ────────────────────────────────────────────────────
export default function Scene1({ lang, onComplete }) {
  const [phase, setPhase] = useState(SCENE1_PHASES.WALKIN);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const sceneStartRef = useRef(new Date().toISOString());
  const selectionStartRef = useRef(null);

  // Walk-in: 5-7 seconds
  useEffect(() => {
    if (phase !== SCENE1_PHASES.WALKIN) return;
    const timer = setTimeout(() => setPhase(SCENE1_PHASES.FEET), 6000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Feet view: 2-3 seconds
  useEffect(() => {
    if (phase !== SCENE1_PHASES.FEET) return;
    const timer = setTimeout(() => {
      selectionStartRef.current = Date.now();
      setPhase(SCENE1_PHASES.SELECTION);
    }, 2500);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleCharacterSelect = (character) => {
    if (phase !== SCENE1_PHASES.SELECTION) return;
    const selectionTime = Date.now();
    setSelectedCharacter(character);
    setPhase(SCENE1_PHASES.VICTORY);

    // After victory reaction, complete scene
    setTimeout(() => {
      const sceneData = {
        scene: 1,
        character_selected: character,
        time_to_select_ms: selectionStartRef.current
          ? selectionTime - selectionStartRef.current
          : null,
        timestamp_scene_start: sceneStartRef.current,
        timestamp_selection_made: new Date(selectionTime).toISOString(),
        // Autism indicator flag
        autism_indicator: character === 'alien',
      };
      onComplete(sceneData);
    }, 3000);
  };

  return (
    <div className="scene1-root">
      {/* Classroom is visible during walkin and feet phases */}
      {(phase === SCENE1_PHASES.WALKIN || phase === SCENE1_PHASES.FEET) && (
        <Classroom phase={phase} />
      )}

      {/* Looking down at feet */}
      {phase === SCENE1_PHASES.FEET && (
        <div className="feet-overlay">
          <RedSneakers />
        </div>
      )}

      {/* Hero selection */}
      {phase === SCENE1_PHASES.SELECTION && (
        <div className="selection-screen">
          {/* Classroom background */}
          <Classroom phase={SCENE1_PHASES.FEET} />

          {/* Prompt */}
          <div className="pick-hero-prompt">
            {t(lang, 'pick_hero')}
          </div>

          {/* Three heroes on clouds */}
          <div className="heroes-row">
            {CHARACTERS.map((char) => (
              <CharacterCloud
                key={char}
                character={char}
                onSelect={() => handleCharacterSelect(char)}
                lang={lang}
              />
            ))}
          </div>

          {/* Player's feet visible at bottom */}
          <div className="selection-feet">
            <RedSneakers />
          </div>
        </div>
      )}

      {/* Victory reaction */}
      {phase === SCENE1_PHASES.VICTORY && selectedCharacter && (
        <div className="victory-screen">
          <Classroom phase={SCENE1_PHASES.FEET} />
          <VictoryReaction character={selectedCharacter} lang={lang} />
          {/* Unchosen characters wave goodbye */}
          <div className="defeated-chars">
            {CHARACTERS.filter((c) => c !== selectedCharacter).map((char) => (
              <div key={char} className="defeated-char-wrap">
                <CharacterCloud character={char} defeated />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
