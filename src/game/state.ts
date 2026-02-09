import type { GameState } from "../shared/types";
import { GAME_CONFIG } from "./config";

export function createInitialState(): GameState {
  return {
    day: 1,
    clock: {
      year: 2010,
      month: 1,
      day: 1,
      hour: 9,
      speed: "PAUSED"
    },
    mode: "EMPLOYEE",
    cash: 500,
    burnRate: GAME_CONFIG.economy.endOfDayFixedExpense,
    energy: 70,
    stress: 25,
    knowledge: 10,
    reputation: 5,
    productivity: 50,
    mood: 60,
    inventory: ["old-laptop"],
    activeGoals: ["Build emergency fund: 1000 cash"],
    skills: {
      backend: 1,
      frontend: 1,
      devops: 0,
      softSkills: 1,
      personalFinance: 0
    },
    pendingEventId: null,
    contentVersion: GAME_CONFIG.contentVersion,
    saveSchemaVersion: GAME_CONFIG.saveSchemaVersion,
    log: []
  };
}
