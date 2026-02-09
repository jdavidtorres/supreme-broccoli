import fs from "node:fs";
import path from "node:path";
import { app } from "electron";
import type { GameState, RunMeta } from "../shared/types";
import { createInitialState } from "../game/state";
import { GAME_CONFIG } from "../game/config";

interface StoredRun {
  slotId: number;
  state: GameState;
  eventHistory: Record<string, number>;
  createdAt: string;
  lastPlayedAt: string;
  playtimeSeconds: number;
  version: string;
}

const DB_FILENAME = "dev-life-tycoon.json";

interface StoredData {
  runs: StoredRun[];
}

export class RunRepository {
  private filePath: string;

  constructor() {
    const dbPath = path.join(app.getPath("userData"), DB_FILENAME);
    this.filePath = dbPath;
    this.migrate();
  }

  private migrate(): void {
    const dir = path.dirname(this.filePath);
    fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.filePath)) {
      const initial: StoredData = { runs: [] };
      fs.writeFileSync(this.filePath, JSON.stringify(initial, null, 2), "utf-8");
    }
  }

  private readStore(): StoredData {
    try {
      const raw = fs.readFileSync(this.filePath, "utf-8");
      const data = JSON.parse(raw) as StoredData;
      if (!data || !Array.isArray(data.runs)) {
        return { runs: [] };
      }
      return data;
    } catch {
      return { runs: [] };
    }
  }

  private writeStore(data: StoredData): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  startNewRun(slotId: number): { state: GameState; eventHistory: Record<string, number> } {
    const now = new Date().toISOString();
    const state = createInitialState();
    const eventHistory: Record<string, number> = {};
    this.upsert({
      slotId,
      state,
      eventHistory,
      createdAt: now,
      lastPlayedAt: now,
      playtimeSeconds: 0,
      version: `save-v${GAME_CONFIG.saveSchemaVersion}`
    });
    return { state, eventHistory };
  }

  loadRun(slotId: number): { state: GameState; eventHistory: Record<string, number>; meta: RunMeta } | null {
    const data = this.readStore();
    const row = data.runs.find((run) => run.slotId === slotId);
    if (!row) {
      return null;
    }
    const state = { ...row.state } as GameState;
    if (!state.clock) {
      const fallback = createInitialState();
      state.clock = fallback.clock;
    }
    state.saveSchemaVersion = GAME_CONFIG.saveSchemaVersion;
    state.contentVersion = GAME_CONFIG.contentVersion;
    return {
      state,
      eventHistory: { ...row.eventHistory },
      meta: {
        slotId: row.slotId,
        createdAt: row.createdAt,
        lastPlayedAt: row.lastPlayedAt,
        playtimeSeconds: row.playtimeSeconds,
        version: row.version
      }
    };
  }

  saveRun(slotId: number, state: GameState, eventHistory: Record<string, number>): void {
    const existing = this.loadRun(slotId);
    const now = new Date().toISOString();
    this.upsert({
      slotId,
      state,
      eventHistory,
      createdAt: existing?.meta.createdAt ?? now,
      lastPlayedAt: now,
      playtimeSeconds: (existing?.meta.playtimeSeconds ?? 0) + 30,
      version: `save-v${GAME_CONFIG.saveSchemaVersion}`
    });
  }

  private upsert(run: StoredRun): void {
    const data = this.readStore();
    const existingIndex = data.runs.findIndex((item) => item.slotId === run.slotId);
    if (existingIndex >= 0) {
      data.runs[existingIndex] = run;
    } else {
      data.runs.push(run);
    }
    this.writeStore(data);
  }
}
