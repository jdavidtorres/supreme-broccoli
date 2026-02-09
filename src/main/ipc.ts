import { ipcMain } from "electron";
import { RunRepository } from "./database";
import { applyAction } from "../game/engine";
import type { ApplyActionInput, DailySummary, GameState, SaveGame } from "../shared/types";
import { validateEvents } from "../game/validation";
import { MVP_EVENTS } from "../game/content";

const SLOT_DEFAULT = 1;

function logIpcError(channel: string, err: unknown): void {
  console.error(`[ipc] ${channel} failed`, err);
}

function toSummary(state: GameState): DailySummary {
  return {
    day: state.day,
    clock: state.clock,
    mode: state.mode,
    cash: state.cash,
    energy: state.energy,
    stress: state.stress,
    reputation: state.reputation,
    productivity: state.productivity,
    mood: state.mood,
    goals: state.activeGoals
  };
}

export function registerGameIpc(repository: RunRepository): void {
  validateEvents(MVP_EVENTS);

  ipcMain.handle("game:startNewRun", (_event, slotId: number = SLOT_DEFAULT) => {
    try {
      const created = repository.startNewRun(slotId);
      return {
        state: created.state,
        summary: toSummary(created.state)
      };
    } catch (err) {
      logIpcError("game:startNewRun", err);
      throw err;
    }
  });

  ipcMain.handle("game:loadRun", (_event, slotId: number = SLOT_DEFAULT) => {
    try {
      const loaded = repository.loadRun(slotId);
      if (!loaded) {
        return null;
      }
      return {
        state: loaded.state,
        summary: toSummary(loaded.state),
        meta: loaded.meta
      };
    } catch (err) {
      logIpcError("game:loadRun", err);
      throw err;
    }
  });

  ipcMain.handle("game:saveRun", (_event, payload: SaveGame) => {
    try {
      const loaded = repository.loadRun(payload.slotId);
      repository.saveRun(payload.slotId, payload.state, loaded?.eventHistory ?? {});
      return { ok: true };
    } catch (err) {
      logIpcError("game:saveRun", err);
      throw err;
    }
  });

  ipcMain.handle("game:applyAction", (_event, payload: ApplyActionInput) => {
    try {
      const loaded = repository.loadRun(payload.slotId);
      const stateData =
        loaded ??
        (() => {
          const created = repository.startNewRun(payload.slotId);
          return { state: created.state, eventHistory: created.eventHistory };
        })();

      const next = applyAction(
        {
          state: stateData.state,
          eventHistory: stateData.eventHistory
        },
        {
          dayAction: payload.dayAction,
          eventOptionId: payload.eventOptionId
        }
      );
      repository.saveRun(payload.slotId, next.state, next.eventHistory);
      return next;
    } catch (err) {
      logIpcError("game:applyAction", err);
      throw err;
    }
  });

  ipcMain.handle("game:getDailySummary", (_event, slotId: number = SLOT_DEFAULT) => {
    try {
      const loaded = repository.loadRun(slotId);
      if (!loaded) {
        const created = repository.startNewRun(slotId);
        return toSummary(created.state);
      }
      return toSummary(loaded.state);
    } catch (err) {
      logIpcError("game:getDailySummary", err);
      throw err;
    }
  });
}
