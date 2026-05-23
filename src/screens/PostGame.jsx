import React, { useState, useEffect, useCallback } from 'react';
import '../styles/PostGame.css';

const BASE = import.meta.env.BASE_URL;

const PANELS = [
  { id: 'skate', src: `${BASE}postgame/skate.jpg`, score: 3 },
  { id: 'burn',  src: `${BASE}postgame/burn.jpg`,  score: 1 },
  { id: 'toxic', src: `${BASE}postgame/toxic.jpg`, score: 0 },
];

// title (1.5s) → panel_0 (2s) → panel_1 (2s) → panel_2 (2s) → choose
const SEQUENCE = ['title', 'panel_0', 'panel_1', 'panel_2', 'choose'];
const DURATIONS = { title: 1500, panel_0: 2000, panel_1: 2000, panel_2: 2000 };

export default function PostGame({ onComplete }) {
  const [step, setStep] = useState('title');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (step === 'choose') return;
    const next = SEQUENCE[SEQUENCE.indexOf(step) + 1];
    const timer = setTimeout(() => setStep(next), DURATIONS[step]);
    return () => clearTimeout(timer);
  }, [step]);

  const handleChoice = useCallback((panel) => {
    if (selected) return;
    setSelected(panel.id);
    setTimeout(() => onComplete({ postgame_choice: panel.id, postgame_score: panel.score }), 800);
  }, [selected, onComplete]);

  if (step === 'title') {
    return (
      <div className="postgame-screen postgame-screen--title">
        <p className="postgame-big-q">WHAT HAPPENS TO JIMIHX NEXT?</p>
      </div>
    );
  }

  if (step.startsWith('panel_')) {
    const panel = PANELS[parseInt(step.split('_')[1])];
    return (
      <div key={panel.id} className="postgame-screen postgame-screen--preview">
        <img src={panel.src} alt="" className="postgame-preview-img" />
      </div>
    );
  }

  return (
    <div className="postgame-screen postgame-screen--choose">
      <p className="postgame-question">WHAT HAPPENS TO JIMIHX NEXT?</p>
      <div className="postgame-choices">
        {PANELS.map((panel) => (
          <button
            key={panel.id}
            className={[
              'postgame-card',
              selected === panel.id ? 'postgame-card--selected' : '',
              selected && selected !== panel.id ? 'postgame-card--dimmed' : '',
            ].join(' ')}
            onClick={() => handleChoice(panel)}
            disabled={!!selected}
          >
            <img src={panel.src} alt="" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
