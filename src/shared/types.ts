export type LifeMode = "EMPLOYEE" | "FREELANCER";

export type DayAction = "WORK" | "CONTRACT" | "STUDY" | "REST" | "LEISURE";

export type TimeSpeed = "PAUSED" | "X1" | "X2" | "X3";

export interface GameClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  speed: TimeSpeed;
}

export type SkillKey = "backend" | "frontend" | "devops" | "softSkills" | "personalFinance";

export interface Skills {
  backend: number;
  frontend: number;
  devops: number;
  softSkills: number;
  personalFinance: number;
}

export interface GameState {
  day: number;
  clock: GameClock;
  mode: LifeMode;
  cash: number;
  burnRate: number;
  energy: number;
  stress: number;
  knowledge: number;
  reputation: number;
  productivity: number;
  mood: number;
  inventory: string[];
  activeGoals: string[];
  skills: Skills;
  pendingEventId: string | null;
  contentVersion: number;
  saveSchemaVersion: number;
  log: string[];
}

export type EffectKey =
  | "cash"
  | "burnRate"
  | "energy"
  | "stress"
  | "knowledge"
  | "reputation"
  | "mood"
  | "backend"
  | "frontend"
  | "devops"
  | "softSkills"
  | "personalFinance";

export interface StatEffect {
  key: EffectKey;
  delta: number;
}

export interface EventCondition {
  minDay?: number;
  maxStress?: number;
  minStress?: number;
  minCash?: number;
  maxCash?: number;
  minReputation?: number;
  mode?: LifeMode;
}

export interface EventOption {
  id: string;
  label: string;
  description: string;
  effects: StatEffect[];
}

export interface EventDefinition {
  id: string;
  title: string;
  body: string;
  weight: number;
  cooldownDays: number;
  conditions?: EventCondition;
  options: EventOption[];
}

export interface DailySummary {
  day: number;
  clock: GameClock;
  mode: LifeMode;
  cash: number;
  energy: number;
  stress: number;
  reputation: number;
  productivity: number;
  mood: number;
  goals: string[];
}

export interface PendingEventView {
  id: string;
  title: string;
  body: string;
  options: Array<Pick<EventOption, "id" | "label" | "description">>;
}

export interface TurnResult {
  dayAction: DayAction | null;
  narrative: string[];
  statChanges: StatEffect[];
  triggeredEvent: PendingEventView | null;
  unlocks: string[];
  dayAdvanced: boolean;
}

export interface SaveGame {
  slotId: number;
  state: GameState;
}

export interface RunMeta {
  slotId: number;
  createdAt: string;
  lastPlayedAt: string;
  playtimeSeconds: number;
  version: string;
}

export interface ApplyActionInput {
  slotId: number;
  dayAction?: DayAction;
  eventOptionId?: string;
}

export interface ApplyActionOutput {
  state: GameState;
  result: TurnResult;
}
