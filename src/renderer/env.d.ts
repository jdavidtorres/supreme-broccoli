import type { ApplyActionInput, SaveGame } from "../shared/types";

declare global {
  interface Window {
    gameApi: {
      startNewRun: (slotId?: number) => Promise<unknown>;
      loadRun: (slotId?: number) => Promise<unknown>;
      saveRun: (payload: SaveGame) => Promise<{ ok: boolean }>;
      applyAction: (payload: ApplyActionInput) => Promise<unknown>;
      getDailySummary: (slotId?: number) => Promise<unknown>;
    };
  }
}

export {};
