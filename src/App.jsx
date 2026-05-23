import React, { useState, useCallback } from 'react';
import Onboarding from './screens/Onboarding.jsx';
import AlienCrossing from './screens/AlienCrossing.jsx';
import OpeningSequence from './screens/OpeningSequence.jsx';
import Scene1 from './screens/Scene1.jsx';
import PostGame from './screens/PostGame.jsx';

// App phases (state machine)
// welcome → disclaimer → age_input → alien_crossing → opening
// → scene1 → [scene2..8 TBD] → postgame → game_over → post_credits → report
const PHASES = {
  WELCOME:       'welcome',
  DISCLAIMER:    'disclaimer',
  AGE_INPUT:     'age_input',
  ALIEN_CROSSING:'alien_crossing',
  OPENING:       'opening',
  SCENE1:        'scene1',
  POSTGAME:      'postgame',
  GAME_OVER:     'game_over',
  POST_CREDITS:  'post_credits',
  REPORT:        'report',
};

function detectDeviceType() {
  const w = window.screen.width;
  const h = window.screen.height;
  return Math.min(w, h) >= 600 ? 'tablet' : 'phone';
}

export default function App() {
  const [phase, setPhase] = useState(PHASES.WELCOME);
  const [lang, setLang] = useState('en');
  const [sessionData, setSessionData] = useState({
    childAge: null,
    startTimestamp: null,
    deviceType: null,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    scene1: null,
    postgame: null,
  });

  const goTo = useCallback((nextPhase) => setPhase(nextPhase), []);

  const handleAgeSubmit = useCallback((age) => {
    setSessionData((prev) => ({
      ...prev,
      childAge: age,
      startTimestamp: new Date().toISOString(),
      deviceType: detectDeviceType(),
    }));
    goTo(PHASES.ALIEN_CROSSING);
  }, [goTo]);

  const handleScene1Complete = useCallback((scene1Data) => {
    setSessionData((prev) => ({ ...prev, scene1: scene1Data }));
    // TODO: advance through scenes 2–8, then go to POSTGAME
    goTo(PHASES.POSTGAME);
  }, [goTo]);

  const handlePostGameComplete = useCallback((pgData) => {
    setSessionData((prev) => {
      const finalData = { ...prev, postgame: pgData };
      console.log('[JimiHx] Session Data:', JSON.stringify(finalData, null, 2));
      return finalData;
    });
    goTo(PHASES.GAME_OVER);
  }, [goTo]);

  // ── Placeholder end screens (Scenes 2-8 + ending sequence TBD) ──────────
  if (phase === PHASES.GAME_OVER) {
    return (
      <div style={endStyle('#000')}>
        <p style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.1em' }}>
          GAME OVER
        </p>
        <button style={btnStyle} onClick={() => goTo(PHASES.POST_CREDITS)}>
          [post-credits tango — tap to continue]
        </button>
      </div>
    );
  }

  if (phase === PHASES.POST_CREDITS) {
    return (
      <div style={endStyle('#0d0d1a')}>
        <p style={{ color: '#aaa', fontSize: '1rem' }}>
          ♪ Sheena &amp; Marilyn dance tango — coming soon ♪
        </p>
        <button style={btnStyle} onClick={() => goTo(PHASES.REPORT)}>
          [end credits — tap to see report]
        </button>
      </div>
    );
  }

  if (phase === PHASES.REPORT) {
    return (
      <div style={{ ...endStyle('#0a0a14'), flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
        <p style={{ color: '#ffd54f', fontWeight: 700 }}>Session complete</p>
        <pre style={{
          background: 'rgba(255,255,255,0.08)', padding: '1rem',
          borderRadius: '8px', fontSize: '0.65rem', color: '#fff',
          textAlign: 'left', maxWidth: '100%', overflow: 'auto',
        }}>
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      </div>
    );
  }
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {(phase === PHASES.WELCOME ||
        phase === PHASES.DISCLAIMER ||
        phase === PHASES.AGE_INPUT) && (
        <Onboarding
          phase={phase}
          lang={lang}
          setLang={setLang}
          onWelcomeDone={() => goTo(PHASES.DISCLAIMER)}
          onDisclaimerDone={() => goTo(PHASES.AGE_INPUT)}
          onAgeSubmit={handleAgeSubmit}
        />
      )}

      {phase === PHASES.ALIEN_CROSSING && (
        <AlienCrossing onDone={() => goTo(PHASES.OPENING)} />
      )}

      {phase === PHASES.OPENING && (
        <OpeningSequence onDone={() => goTo(PHASES.SCENE1)} />
      )}

      {phase === PHASES.SCENE1 && (
        <Scene1 lang={lang} onComplete={handleScene1Complete} />
      )}

      {phase === PHASES.POSTGAME && (
        <PostGame onComplete={handlePostGameComplete} />
      )}
    </div>
  );
}

const endStyle = (bg) => ({
  width: '100%', height: '100%', background: bg,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexDirection: 'column', gap: '1.5rem', padding: '2rem',
});

const btnStyle = {
  background: 'none', border: '1px solid #444', color: '#888',
  fontSize: '0.8rem', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer',
};
