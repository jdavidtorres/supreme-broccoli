# Dev Life Tycoon - GDD (MVP)

## Goal

Deliver a playable 7-day MVP where the player manages money, stress, energy, and reputation through daily actions and event choices.

## Implemented Scope

- Platform: Electron desktop app.
- UI: React renderer with stats panel, narrative feed, action buttons, day clock, and desk scene.
- Data: SQLite local save with slot support.
- Gameplay loop:
  1. Start/load run
  2. Pick day action
  3. Resolve random event
  4. Apply end-of-day costs/recovery
  5. Advance day
- Event system: data-driven event definitions with conditions, options, effects, and cooldowns.
- Mode: Employee (Freelancer planned for V1).

## Key Systems

- `GameState` central model with cash, burn rate, energy, stress, knowledge, reputation, productivity, mood, goals, and skills.
- Productivity formula derived from skills + energy/stress/mood.
- IPC contract:
  - `game:startNewRun`
  - `game:loadRun`
  - `game:saveRun`
  - `game:applyAction`
  - `game:getDailySummary`

## Content (MVP)

- 5 random events:
  - Urgent hotfix
  - Surprise tax
  - Party invite
  - Laptop breaks
  - Mentor course recommendation

## Acceptance Criteria

- Full 7-day run without crashes.
- At least one random event appears with option choices.
- Save/load preserves exact state.
- Day does not advance until pending event is resolved.
