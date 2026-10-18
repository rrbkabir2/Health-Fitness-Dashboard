# Project Guide

## Purpose
Build a portfolio-ready, privacy-minded health and fitness dashboard using HTML, CSS, and vanilla JavaScript. Keep it easy to run locally without a build step or backend.

## Architecture
- `index.html`: semantic app structure and forms.
- `css/style.css`: responsive styles, theme tokens, visible focus states.
- `js/`: plain browser JavaScript split into focused modules as features grow.
- Use browser localStorage only for user-selected local records. Do not send user data over a network.

## Coding rules
- Keep code beginner-friendly and modular; avoid frameworks and unnecessary dependencies.
- Validate user input and render user text with safe text APIs, never unsafe HTML insertion.
- Explain calculation formulas and assumptions. Do not present estimates as medical advice.
- Support keyboard use, reduced motion, small screens, and adequate color contrast.
- Do not add sample/personal records unless the user explicitly selects a demo mode.
- Preserve unrelated files and user changes. Do not commit or push without explicit authorization.
- Keep `TASK_TRACKER.md`, `HANDOFF.md`, `PROJECT_STATUS.md`, and `CHANGELOG.md` synchronized at each meaningful checkpoint.
- A task is complete only after implementation and appropriate verification.

## Verification
Use focused checks for calculations, validation, storage, and responsive behavior as features are added. Record only checks actually run and their outcomes.
