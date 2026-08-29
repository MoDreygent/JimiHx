import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SCREENS, FIRST_SCREEN, CHOICE_TIME_LIMIT, DARK_GAP, needsDarkGap,
} from './screens.js';
import GateScreen from './GateScreen.jsx';
import CloudFrame from './CloudFrame.jsx';
import { t } from '../locales.js';
import '../styles/Game.css';

// ─────────────────────────────────────────────────────────────────────────────
// GameRunner — plays the screen manifest end to end.
//
// One run = one uninterrupted pass. No pause, no restart, no going back.
// Every resolution is appended to the log; the log is the report's input.
// ─────────────────────────────────────────────────────────────────────────────

export default function GameRunner({ lang, onFinish }) {
  const [screenId, setScreenId] = useState(FIRST_SCREEN);
  const [gap, setGap]           = useState(false);
  const [player, setPlayer]     = useState(null);   // { age, email }
  const [log, setLog]           = useState([]);
  const [score, setScore]       = useState(0);

  const screen = SCREENS[screenId];

  // ── advance ───────────────────────────────────────────────────────────────
  const advance = useCallback((toId) => {
    if (!toId || !SCREENS[toId]) { onFinish({ player, log, score }); return; }

    if (needsDarkGap(screenId, toId)) {
      setGap(true);
      setTimeout(() => { setGap(false); setScreenId(toId); }, DARK_GAP * 1000);
    } else {
      setScreenId(toId);
    }
  }, [screenId, player, log, score, onFinish]);

  // ── record a resolution and move on ───────────────────────────────────────
  const resolve = useCallback((entry, toId) => {
    setLog((prev) => [...prev, { screen: screenId, ...entry, at: Date.now() }]);
    if (entry.score) setScore((prev) => prev + entry.score);
    advance(toId);
  }, [screenId, advance]);

  if (gap) return <div className="game-gap" />;
  if (!screen) return <div className="game-gap" />;

  // ── GATE ──────────────────────────────────────────────────────────────────
  if (screen.type === 'gate') {
    return (
      <GateScreen
        lang={lang}
        onReady={({ age, email }) => {
          setPlayer({ age, email });
          setLog((prev) => [...prev, { screen: screenId, age, email, at: Date.now() }]);
          advance(screen.next);
        }}
      />
    );
  }

  // ── VIDEO ─────────────────────────────────────────────────────────────────
  if (screen.type === 'video') {
    return (
      <VideoScreen
        key={screenId}
        screen={screen}
        onDone={() => resolve({ type: 'video' }, screen.next)}
      />
    );
  }

  // ── CHOICE ────────────────────────────────────────────────────────────────
  if (screen.type === 'choice') {
    return (
      <ChoiceScreen
        key={screenId}
        screen={screen}
        lang={lang}
        onChoose={(choice) => resolve(
          {
            type: 'choice',
            choice: choice.key,
            score: choice.score ?? 0,
            tag: choice.tag ?? null,
          },
          choice.next ?? screen.next,
        )}
        onTimeout={() => resolve(
          { type: 'timeout', choice: null, score: 0, tag: null },
          screen.next,
        )}
      />
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// VideoScreen — loop:false plays once and advances.
//               loop:true repeats until the hotspot is tapped.
// ─────────────────────────────────────────────────────────────────────────────
function VideoScreen({ screen, onDone }) {
  return (
    <div className="game-screen">
      <video
        className="game-video"
        src={screen.src}
        autoPlay
        muted={false}
        playsInline
        loop={!!screen.loop}
        onEnded={screen.loop ? undefined : onDone}
      />
      {screen.loop && screen.hotspot && (
        <button
          className={`game-hotspot game-hotspot--${screen.hotspot}`}
          onClick={onDone}
          aria-label="continue"
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ChoiceScreen — the clip plays, freezes on its final frame, taps go live.
// The 90s clock starts the moment the taps become available, not before.
// ─────────────────────────────────────────────────────────────────────────────
function ChoiceScreen({ screen, lang, onChoose, onTimeout }) {
  const [live, setLive]       = useState(false);
  const [picked, setPicked]   = useState(null);
  const [left, setLeft]       = useState(CHOICE_TIME_LIMIT);
  const videoRef              = useRef(null);

  // freeze on the last frame instead of looping back
  const handleEnded = () => {
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = Math.max(0, v.duration - 0.05); }
    setLive(true);
  };

  // clock starts with `live`
  useEffect(() => {
    if (!live || picked) return;
    if (left <= 0) { onTimeout(); return; }
    const tick = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(tick);
  }, [live, left, picked, onTimeout]);

  const choose = (choice) => {
    if (picked) return;
    setPicked(choice.key);
    setTimeout(() => onChoose(choice), 400);
  };

  return (
    <div className="game-screen">
      <video
        ref={videoRef}
        className="game-video"
        src={screen.src}
        autoPlay
        muted={false}
        playsInline
        onEnded={handleEnded}
      />

      {/* three side-by-side regions (JH.2 hero pick) */}
      {live && screen.layout === 'thirds' && (
        <div className="game-thirds">
          {screen.choices.map((c) => (
            <button
              key={c.key}
              className={`game-third ${picked === c.key ? 'is-picked' : ''}`}
              onClick={() => choose(c)}
              aria-label={c.key}
            />
          ))}
        </div>
      )}

      {/* lettered options inside the cloud (JH.5 and friends) */}
      {live && !screen.layout && (
        <CloudFrame>
          {screen.prompt && (
            <p className="cloud-q">{t(lang, screen.prompt)}</p>
          )}
          <ul className="cloud-opts">
            {screen.choices.map((c) => (
              <li key={c.key}>
                <button
                  className={`cloud-opt ${picked === c.key ? 'is-picked' : ''}`}
                  onClick={() => choose(c)}
                >
                  <span className="cloud-opt-key">{c.key})</span>
                  <span>{t(lang, c.label)}</span>
                </button>
              </li>
            ))}
          </ul>
        </CloudFrame>
      )}
    </div>
  );
}
