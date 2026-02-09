import type { GameState } from "../shared/types";

export function computeProductivity(state: GameState): number {
  const skillScore =
    state.skills.backend * 1.4 +
    state.skills.frontend * 1.2 +
    state.skills.devops * 1.2 +
    state.skills.softSkills * 0.8;
  const energyFactor = state.energy / 100;
  const stressPenalty = state.stress / 130;
  const moodFactor = state.mood / 120;
  const value = Math.round((skillScore * 9 + state.knowledge * 0.8 + 20) * energyFactor * moodFactor - stressPenalty * 30);
  return Math.max(0, Math.min(100, value));
}
