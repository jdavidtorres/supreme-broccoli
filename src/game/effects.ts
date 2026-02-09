import type { GameState, StatEffect } from "../shared/types";
import { computeProductivity } from "./metrics";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function applyEffects(state: GameState, effects: StatEffect[]): GameState {
  const next: GameState = {
    ...state,
    skills: { ...state.skills },
    activeGoals: [...state.activeGoals],
    inventory: [...state.inventory],
    log: [...state.log]
  };

  for (const effect of effects) {
    switch (effect.key) {
      case "cash":
        next.cash += effect.delta;
        break;
      case "burnRate":
        next.burnRate = Math.max(0, next.burnRate + effect.delta);
        break;
      case "energy":
        next.energy = clamp(next.energy + effect.delta, 0, 100);
        break;
      case "stress":
        next.stress = clamp(next.stress + effect.delta, 0, 100);
        break;
      case "knowledge":
        next.knowledge = Math.max(0, next.knowledge + effect.delta);
        break;
      case "reputation":
        next.reputation = Math.max(0, next.reputation + effect.delta);
        break;
      case "mood":
        next.mood = clamp(next.mood + effect.delta, 0, 100);
        break;
      case "backend":
      case "frontend":
      case "devops":
      case "softSkills":
      case "personalFinance":
        next.skills[effect.key] = Math.max(0, next.skills[effect.key] + effect.delta);
        break;
      default:
        break;
    }
  }

  next.productivity = computeProductivity(next);
  return next;
}
