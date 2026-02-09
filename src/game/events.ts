import type { EventCondition, EventDefinition, GameState } from "../shared/types";
import { pickWeighted } from "./rng";

function checkCondition(state: GameState, condition?: EventCondition): boolean {
  if (!condition) {
    return true;
  }
  if (condition.minDay !== undefined && state.day < condition.minDay) {
    return false;
  }
  if (condition.minStress !== undefined && state.stress < condition.minStress) {
    return false;
  }
  if (condition.maxStress !== undefined && state.stress > condition.maxStress) {
    return false;
  }
  if (condition.minCash !== undefined && state.cash < condition.minCash) {
    return false;
  }
  if (condition.maxCash !== undefined && state.cash > condition.maxCash) {
    return false;
  }
  if (condition.minReputation !== undefined && state.reputation < condition.minReputation) {
    return false;
  }
  if (condition.mode !== undefined && state.mode !== condition.mode) {
    return false;
  }
  return true;
}

export function selectEvent(
  state: GameState,
  eventHistory: Record<string, number>,
  events: EventDefinition[]
): EventDefinition | null {
  const eligible = events.filter((event) => {
    if (!checkCondition(state, event.conditions)) {
      return false;
    }
    const lastDay = eventHistory[event.id];
    if (lastDay === undefined) {
      return true;
    }
    return state.day - lastDay > event.cooldownDays;
  });
  return pickWeighted(eligible);
}
