import { contextBridge, ipcRenderer } from "electron";
import type { ApplyActionInput, SaveGame } from "../shared/types";

const api = {
  startNewRun: (slotId = 1) => ipcRenderer.invoke("game:startNewRun", slotId),
  loadRun: (slotId = 1) => ipcRenderer.invoke("game:loadRun", slotId),
  saveRun: (payload: SaveGame) => ipcRenderer.invoke("game:saveRun", payload),
  applyAction: (payload: ApplyActionInput) => ipcRenderer.invoke("game:applyAction", payload),
  getDailySummary: (slotId = 1) => ipcRenderer.invoke("game:getDailySummary", slotId)
};

contextBridge.exposeInMainWorld("gameApi", api);
