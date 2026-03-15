import React, { useState, useCallback } from 'react';
import Onboarding from './screens/Onboarding.jsx';
import OpeningSequence from './screens/OpeningSequence.jsx';
import Scene1 from './screens/Scene1.jsx';

// App phases (state machine)
// welcome → disclaimer → age_input → opening → scene1_walkin → scene1_feet
// → scene1_selection → scene1_victory → scene1_done
const PHASES = {
  WELCOME: 'welcome',
  DISCLAIMER: 'disclaimer',
  AGE_INPUT: 'age_input',
  OPENING: 'opening',
  SCENE1: 'scene1',
};

function detectDeviceType() {
  const w = window.screen.width;
  const h = window.screen.height;
  const shortSide = Math.min(w, h);
  return shortSide >= 600 ? 'tablet' : 'phone';
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
  });

  const goTo = useCallback((nextPhase) => setPhase(nextPhase), []);

  const handleDisclaimerDone = useCallback(() => goTo(PHASES.AGE_INPUT), [goTo]);

  const handleAgeSubmit = useCallback((age) => {
    setSessionData((prev) => ({
      ...prev,
      childAge: age,
      startTimestamp: new Date().toISOString(),
      deviceType: detectDeviceType(),
    }));
    goTo(PHASES.OPENING);
  }, [goTo]);

  const handleOpeningDone = useCallback(() => goTo(PHASES.SCENE1), [goTo]);

  const handleScene1Complete = useCallback((scene1Data) => {
    setSessionData((prev) => ({ ...prev, scene1: scene1Data }));
    // Log session data to console (exportable as JSON per spec)
    const finalData = { ...sessionData, scene1: scene1Data };
    console.log('[JimiHx] Session Data:', JSON.stringify(finalData, null, 2));
    // TODO: Scene 2 — for now show a placeholder
    goTo('done');
  }, [goTo, sessionData]);

  if (phase === 'done') {
    return (
      <div style={{
        width: '100%', height: '100%', background: '#1a1a2e',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: 'sans-serif', padding: '2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h2 style={{ marginBottom: '0.5rem' }}>Scene 1 Complete</h2>
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Scene 2 coming soon.</p>
        <pre style={{
          marginTop: '2rem', background: 'rgba(255,255,255,0.1)',
          padding: '1rem', borderRadius: '8px', fontSize: '0.7rem',
          textAlign: 'left', maxWidth: '100%', overflow: 'auto',
        }}>
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      </div>
    );
  }

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
          onDisclaimerDone={handleDisclaimerDone}
          onAgeSubmit={handleAgeSubmit}
        />
      )}

      {phase === PHASES.OPENING && (
        <OpeningSequence onDone={handleOpeningDone} />
      )}

      {phase === PHASES.SCENE1 && (
        <Scene1
          lang={lang}
          onComplete={handleScene1Complete}
        />
      )}
    </div>
  );
}
