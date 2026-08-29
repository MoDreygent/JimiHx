// ─────────────────────────────────────────────────────────────────────────────
// JIMIHX — SCREEN MANIFEST
//
// The whole game is data. The engine (GameRunner) reads this list and plays it.
// Adding a scene = adding an entry here. No engine changes.
//
// TYPES
//   'gate'   — the age + email form. No time limit.
//   'video'  — a clip. loop:false auto-advances at the end.
//              loop:true repeats until the player taps `hotspot`.
//   'choice' — clip plays, freezes on its last frame, tap targets go live.
//              Timer starts the moment the taps become available.
//
// DARK GAP
//   3s black between screens whose MAJOR number differs.
//   JH.1 → JH.1.1  same major (1)  → no gap
//   JH.3.2 → JH.4  major 3 → 4     → gap
//   Computed by the engine, never hand-written.
//
// SCORING
//   Straight 0–3 per scored choice, summed into the run total.
//   `tag` marks which construct the point loads onto:
//     CD = Conduct Disorder | ASD | ADHD | ANX
//   Untagged points count toward the total only.
// ─────────────────────────────────────────────────────────────────────────────

const V = (name) => `${import.meta.env.BASE_URL}video/${name}`;

export const SCREENS = {

  // ── JH.0 — GATE ────────────────────────────────────────────────────────────
  'JH.0': {
    type: 'gate',
    next: 'JH.1',
  },

  // ── JH.1 — HOME SCREEN ─────────────────────────────────────────────────────
  // Loops forever. Player taps the JimiHx logo in the middle to begin.
  'JH.1': {
    type: 'video',
    src: V('JH.1.mp4'),
    duration: 10,
    loop: true,
    hotspot: 'center',
    next: 'JH.1.1',
  },

  // ── JH.1.1 — MISSION BRIEF ─────────────────────────────────────────────────
  'JH.1.1': {
    type: 'video',
    src: V('JH.1.1.mp4'),
    duration: 17,
    loop: false,
    next: 'JH.2',
  },

  // ── JH.2 — PICK YOUR HERO ──────────────────────────────────────────────────
  // Freezes at 0:19 on three characters side by side. Each is a tap target.
  // Not scored — logged for onboarding analytics only.
  'JH.2': {
    type: 'choice',
    src: V('JH.2.mp4'),
    duration: 19,
    scored: false,
    layout: 'thirds',
    choices: [
      { key: 'boy',   region: 'left',   next: 'JH.2.1' },
      { key: 'girl',  region: 'center', next: 'JH.2.2' },
      { key: 'alien', region: 'right',  next: 'JH.2.3' },
    ],
  },

  // ── JH.2.1 / 2.2 / 2.3 — HERO REVEALS ──────────────────────────────────────
  // All three converge back to the hallway.
  'JH.2.1': { type: 'video', src: V('JH.2.1.mp4'), duration: 11, loop: false, next: 'JH.3' },
  'JH.2.2': { type: 'video', src: V('JH.2.2.mp4'), duration: 13, loop: false, next: 'JH.3' },
  'JH.2.3': { type: 'video', src: V('JH.2.3.mp4'), duration:  7, loop: false, next: 'JH.3' },

  // ── JH.3 — HALLWAY ─────────────────────────────────────────────────────────
  'JH.3': {
    type: 'video',
    src: V('JH.3.mp4'),
    duration: 9,
    loop: false,
    next: 'JH.4',
  },

  // ── JH.4 — YARD WALK ───────────────────────────────────────────────────────
  // Jimi walks past the yard. Everything here is a memory plant for later
  // recall questions. Sheena appears at the end and asks the question that
  // JH.5 answers.
  'JH.4': {
    type: 'video',
    src: V('JH.4.mp4'),
    duration: 49,
    loop: false,
    next: 'JH.5',
  },

  // ── JH.5 — "WHICH ONE FITS YOU BEST?" ──────────────────────────────────────
  // First scored screen. Asked BEFORE any recall question so the player
  // can't anchor their attention — they don't yet know they'll be tested.
  'JH.5': {
    type: 'choice',
    src: V('JH.5.mp4'),
    duration: 90,
    scored: true,
    prompt: 'q_fits_you_best',
    choices: [
      { key: 'A', label: 'opt_under_tree',   score: 1 },
      { key: 'B', label: 'opt_soccer',       score: 0 },
      { key: 'C', label: 'opt_bike_kick',    score: 3, tag: 'CD' },
      { key: 'D', label: 'opt_guitar_kids',  score: 0 },
      { key: 'E', label: 'opt_home_sleep',   score: 2 },
    ],
    next: 'JH.6',
  },

  // ── JH.6 onward — awaiting spec ────────────────────────────────────────────
};

export const FIRST_SCREEN = 'JH.0';

// Every choice screen gets 90s once the taps go live.
export const CHOICE_TIME_LIMIT = 90;

// Black between screens, when the major number changes.
export const DARK_GAP = 3;

/** "JH.3.2" → 3 */
export function majorOf(id) {
  return parseInt(String(id).replace(/^JH\./, '').split('.')[0], 10);
}

/** 3s of black only when crossing into a new major number. */
export function needsDarkGap(fromId, toId) {
  if (!fromId || !toId) return false;
  return majorOf(fromId) !== majorOf(toId);
}
