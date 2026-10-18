# Task Tracker

## Implementation plan

1. **Inspect workspace and establish project guidance** — check Git state and existing files; document architecture, coding rules, and the phased plan. Status: `COMPLETED`.
2. **Build the core BMI calculator (Phase 1)** — responsive accessible interface; metric/imperial height and weight inputs; validation, category scale, formula, disclaimer, and reset. Status: `COMPLETED`.
3. **Add unit conversion and health estimates (Phase 2)** — BMR, TDEE, calorie estimates, rough ideal-weight estimate, waist-to-height ratio, water estimate, and converters with documented assumptions. Status: `NOT_STARTED`.
4. **Build profile and personal dashboard (Phase 3)** — local profile, summary cards, date based weight records, and storage behavior. Status: `NOT_STARTED`.
5. **Add goals, history, charts, and journals (Phase 4)** — target tracking, habits, weight/BMI trends, food and activity entries with edit/delete. Status: `NOT_STARTED`.
6. **Add privacy and data controls (Phase 5)** — privacy notice, export/import validation, delete confirmation, themes, and accessibility improvements. Status: `NOT_STARTED`.
7. **Verify and prepare for GitHub (Phase 6)** — run appropriate checks, resolve issues, document setup, formulas, privacy, tests, screenshots placeholder, and license. Status: `PARTIALLY_COMPLETED`.

## Checkpoint log

### 2026-10-18 — workspace inspection and plan
- Git: clean `main...origin/main`; latest commit `6b4e33e` (`Initial commit`).
- Workspace contains only an empty `t.txt` and Git metadata; no app source or project docs exist.
- Created `AGENTS.md`, `TASK_TRACKER.md`, `HANDOFF.md`, `PROJECT_STATUS.md`, and `CHANGELOG.md` before implementation.
- Tests run: none.
- Unresolved issues: none.
- Next action: implement the standalone BMI experience for Phase 1.

### 2026-10-18 — Phase 1 BMI checkpoint
- Implemented BMI form and responsive dashboard shell in `index.html`, `css/style.css`, and `js/app.js`.
- Added reusable `js/calculators.js` helpers and `tests/bmi.test.cjs`. The shared helper script supports opening `index.html` directly without a local server.
- Validation covers missing values, nonnumeric values, zero/negative values, and realistic height/weight bounds in metric and imperial modes.
- Adult categories use cutoffs at 18.5, 25, and 30. Result displays two decimals and the formula/disclaimer.
- Removed external font requests; the app has no external scripts, analytics, API calls, or personal-data transmission.
- Tests actually run: `node --test tests/bmi.test.cjs` — 4 passed; `node --check js/app.js` — passed; `node --check js/calculators.js` — passed.
- Browser checked with headless Chrome: empty state, Overview/Calculators navigation, metric BMI result `23.53`, imperial BMI result `23.49`, and no JavaScript exceptions.
- Not yet verified: full keyboard walkthrough, responsive viewport screenshots, and broader device/browser coverage.
- Unresolved: scale is a visual guide over BMI 10–40 and clamps outside that range; tests are helper-level and do not exercise DOM interaction.
- Next action: begin Phase 2 calculators.

### 2026-10-18 — README and local browser verification
- Added `README.md` with objectives, current features, technologies, structure, setup commands, test instructions, BMI formula and categories, privacy notes, screenshot placeholders, roadmap, and license status.
- Browser smoke checks passed in headless Chrome: initial empty state; Overview and Calculators anchor navigation; metric BMI `23.53`; imperial BMI `23.49`; no page JavaScript exceptions.
- HTTP checks: `/`, `/css/style.css`, `/js/app.js`, and `/js/calculators.js` each returned 200 from the local Python server.
- Automated checks: `node --test tests/bmi.test.cjs` — 4 passed; both `node --check` commands passed.
- Git working tree was clean before this documentation update. No commit or push made.
- Remaining verification: full keyboard walkthrough, responsive viewport screenshots, and additional browser coverage.
- Next action: begin Phase 2 calculators.
