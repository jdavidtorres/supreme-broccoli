---
name: develop-web-game
description: Build and validate web games iteratively with Playwright. Use for implementing small gameplay changes, adding render_game_to_text, deterministic time stepping, and verifying controls/state via automated runs and screenshots.
---

# Develop Web Game

## When to use

Use this skill when implementing or validating web game features with automated Playwright runs, or when adding/maintaining deterministic hooks and text-state outputs.

## Workflow (tight loop)

1. Pick a goal: one feature or behavior.
2. Implement small: the smallest change that moves the game forward.
3. Ensure integration points:
   - Single canvas centered in the window.
   - window.render_game_to_text returns concise JSON state.
   - window.advanceTime(ms) steps deterministic updates.
4. Initialize progress.md:
   - If missing, create and write "Original prompt: <prompt>" at top.
   - If present, read it first and keep existing content.
5. Verify Playwright availability (prefer npx if unsure).
6. Run the Playwright client after each meaningful change.
7. Capture screenshots and render_game_to_text output.
8. Open the latest screenshot and verify visuals.
9. Fix issues, re-run, and repeat until stable.
10. Update progress.md with TODOs, notes, and decisions.

## Game output requirements

- render_game_to_text returns a concise JSON string with:
  - mode/state flags
  - player position/velocity
  - active enemies/obstacles/collectibles
  - timers/cooldowns, score/resources
  - coordinate system note (origin and axis directions)
- Avoid histories; include only current, visible state.

Minimal pattern:

```js
function renderGameToText() {
  const payload = {
    mode: state.mode,
    player: { x: state.player.x, y: state.player.y, r: state.player.r },
    entities: state.entities.map((e) => ({ x: e.x, y: e.y, r: e.r })),
    score: state.score,
    coords: "origin top-left, +x right, +y down",
  };
  return JSON.stringify(payload);
}
window.render_game_to_text = renderGameToText;
```

## Deterministic stepping

Expose window.advanceTime(ms) and make the main loop use it when present.

Minimal pattern:

```js
window.advanceTime = (ms) => {
  const steps = Math.max(1, Math.round(ms / (1000 / 60)));
  for (let i = 0; i < steps; i++) update(1 / 60);
  render();
};
```

## Fullscreen

- Toggle fullscreen with the f key.
- Esc exits fullscreen.
- Resize canvas/rendering on toggle.

## Testing checklist (must verify)

- Core inputs: move/jump/attack/interact/select/pause/restart.
- Multi-step chains: cause -> intermediate -> outcome.
- Win/lose transitions and score/health/resource changes.
- Boundaries: collisions, walls, screen edges.
- Menu/start flow if present.
- Any new features added by the request.

## Playwright run (required)

Run the client after each meaningful change.
Example:

```
node "$WEB_GAME_CLIENT" --url http://localhost:5173 --actions-file "$WEB_GAME_ACTIONS" --click-selector "#start-btn" --iterations 3 --pause-ms 250
```

## Artifacts to inspect

- Latest screenshots from Playwright.
- Latest render_game_to_text output.
- Console errors (fix first new error before continuing).

## Notes

- Draw backgrounds on the canvas (avoid CSS backgrounds).
- Keep on-screen text minimal; put controls on the start/menu screen.
- Avoid overly dark scenes unless the design calls for it.
- Reset between scenarios to avoid cross-test state.
