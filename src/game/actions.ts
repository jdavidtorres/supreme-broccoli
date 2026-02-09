import type { DayAction, StatEffect } from "../shared/types";

export interface ActionResolution {
  effects: StatEffect[];
  narrative: string;
}

export function resolveAction(action: DayAction): ActionResolution {
  switch (action) {
    case "WORK":
      return {
        narrative: "You focused on office tasks and shipped a useful fix.",
        effects: [
          { key: "cash", delta: 120 },
          { key: "energy", delta: -15 },
          { key: "stress", delta: 10 },
          { key: "reputation", delta: 4 },
          { key: "knowledge", delta: 2 },
          { key: "backend", delta: 1 }
        ]
      };
    case "CONTRACT":
      return {
        narrative: "You took a side contract after hours and pushed hard to deliver.",
        effects: [
          { key: "cash", delta: 180 },
          { key: "energy", delta: -20 },
          { key: "stress", delta: 14 },
          { key: "reputation", delta: 2 },
          { key: "knowledge", delta: 3 },
          { key: "frontend", delta: 1 }
        ]
      };
    case "STUDY":
      return {
        narrative: "You studied intentionally and invested in your future self.",
        effects: [
          { key: "cash", delta: -35 },
          { key: "energy", delta: -8 },
          { key: "stress", delta: -4 },
          { key: "knowledge", delta: 8 },
          { key: "reputation", delta: 1 },
          { key: "devops", delta: 1 },
          { key: "personalFinance", delta: 1 }
        ]
      };
    case "REST":
      return {
        narrative: "You slowed down, slept better, and reset your baseline.",
        effects: [
          { key: "energy", delta: 24 },
          { key: "stress", delta: -18 },
          { key: "mood", delta: 10 }
        ]
      };
    case "LEISURE":
      return {
        narrative: "You disconnected for a while and had a decent time.",
        effects: [
          { key: "cash", delta: -45 },
          { key: "energy", delta: 8 },
          { key: "stress", delta: -10 },
          { key: "mood", delta: 12 },
          { key: "softSkills", delta: 1 }
        ]
      };
    default:
      return {
        narrative: "You spent the day in a neutral flow.",
        effects: []
      };
  }
}
