import type { DayAction, StatEffect } from "../shared/types";

export interface ActionResolution {
  effects: StatEffect[];
  narrative: string;
  hoursSpent: number;
}

export function resolveAction(action: DayAction): ActionResolution {
  switch (action) {
    case "WORK":
      return {
        narrative: "Te concentraste en tareas de oficina y desplegaste un fix útil.",
        hoursSpent: 4,
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
        narrative: "Tomaste un contrato extra fuera de horario y te esforzaste al máximo para entregar.",
        hoursSpent: 5,
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
        narrative: "Estudiaste con intención e invertiste en tu futuro.",
        hoursSpent: 3,
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
        narrative: "Bajaste el ritmo, dormiste mejor y restableciste tu nivel base.",
        hoursSpent: 2,
        effects: [
          { key: "energy", delta: 24 },
          { key: "stress", delta: -18 },
          { key: "mood", delta: 10 }
        ]
      };
    case "LEISURE":
      return {
        narrative: "Te desconectaste un rato y la pasaste bien.",
        hoursSpent: 3,
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
        narrative: "Pasaste el día en un flujo neutral.",
        hoursSpent: 1,
        effects: []
      };
  }
}
