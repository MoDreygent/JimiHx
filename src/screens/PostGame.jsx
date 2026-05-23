import React, { useState, useCallback } from 'react';
import { t } from '../locales.js';
import '../styles/PostGame.css';

const BASE = import.meta.env.BASE_URL;

const CHOICES = [
  { id: 'toxic',  src: `${BASE}postgame/toxic.jpg`  },
  { id: 'burn',   src: `${BASE}postgame/burn.jpg`   },
  { id: 'skate',  src: `${BASE}postgame/skate.jpg`  },
];

export default function PostGame({ lang, onComplete }) {
  const [selected, setSelected] = useState(null);

  const handleChoice = useCallback((choice) => {
    if (selected) return;
    setSelected(choice.id);
    setTimeout(() => onComplete({ postgame_choice: choice.id }), 800);
  }, [selected, onComplete]);

  return (
    <div className="postgame-screen">
      <p className="postgame-question">{t(lang, 'postgame_question')}</p>
      <div className="postgame-choices">
        {CHOICES.map((choice) => (
          <button
            key={choice.id}
            className={[
              'postgame-card',
              selected === choice.id  ? 'postgame-card--selected' : '',
              selected && selected !== choice.id ? 'postgame-card--dimmed' : '',
            ].join(' ')}
            onClick={() => handleChoice(choice)}
            disabled={!!selected}
          >
            <img src={choice.src} alt="" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
