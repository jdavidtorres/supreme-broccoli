import type {
  ApplyActionOutput,
  DayAction,
  EventDefinition,
  EventOption,
  GameState,
  PendingEventView,
  StatEffect
} from "../shared/types";
import { GAME_CONFIG } from "./config";
import { resolveAction } from "./actions";
import { MVP_EVENTS } from "./content";
import { applyEffects } from "./effects";
import { selectEvent } from "./events";
import { computeProductivity } from "./metrics";
import { advanceDay } from "./time";

function endOfDay(state: GameState): { state: GameState; effects: StatEffect[]; narrative: string[] } {
  const effects: StatEffect[] = [
    { key: "cash", delta: -state.burnRate },
    { key: "mood", delta: state.stress > 70 ? -6 : 2 },
    { key: "energy", delta: 5 },
    { key: "stress", delta: -3 }
  ];
  const next = applyEffects(state, effects);
  const withDayAdvance: GameState = {
    ...next,
    day: state.day + 1,
    clock: advanceDay(state.clock),
    pendingEventId: null,
    productivity: computeProductivity(next)
  };
  const narrative = [`End of day expenses: -${state.burnRate} cash.`];
  if (withDayAdvance.day > GAME_CONFIG.maxDay) {
    narrative.push("Week complete. You reached the end of the MVP run.");
  }
  return { state: withDayAdvance, effects, narrative };
}

function toEventView(event: EventDefinition): PendingEventView {
  return {
    id: event.id,
    title: event.title,
    body: event.body,
    options: event.options.map((option) => ({
      id: option.id,
      label: option.label,
      description: option.description
    }))
  };
}

function findOption(event: EventDefinition, optionId: string): EventOption {
  const option = event.options.find((item) => item.id === optionId);
  if (!option) {
    throw new Error(`Invalid event option '${optionId}' for event '${event.id}'.`);
  }
  return option;
}

export interface EngineContext {
  state: GameState;
  eventHistory: Record<string, number>;
}

export function applyAction(
  context: EngineContext,
  input: { dayAction?: DayAction; eventOptionId?: string; events?: EventDefinition[] }
): ApplyActionOutput & { eventHistory: Record<string, number> } {
  const events = input.events ?? MVP_EVENTS;
  const history = { ...context.eventHistory };
  const narrative: string[] = [];
  const statChanges: StatEffect[] = [];
  let state = {
    ...context.state,
    skills: { ...context.state.skills },
    activeGoals: [...context.state.activeGoals],
    inventory: [...context.state.inventory],
    log: [...context.state.log]
  };

  if (state.day > GAME_CONFIG.maxDay) {
    return {
      state,
      eventHistory: history,
      result: {
        dayAction: null,
        narrative: ["Run already completed. Start a new run to continue."],
        statChanges: [],
        triggeredEvent: null,
        unlocks: [],
        dayAdvanced: false
      }
    };
  }

  if (state.pendingEventId) {
    if (!input.eventOptionId) {
      throw new Error("Event option is required while an event is pending.");
    }
    const event = events.find((item) => item.id === state.pendingEventId);
    if (!event) {
      throw new Error(`Pending event '${state.pendingEventId}' was not found.`);
    }
    const option = findOption(event, input.eventOptionId);
    state = applyEffects(state, option.effects);
    statChanges.push(...option.effects);
    narrative.push(`Event resolved: ${event.title} -> ${option.label}`);
    history[event.id] = context.state.day;

    const dayClosure = endOfDay(state);
    state = dayClosure.state;
    statChanges.push(...dayClosure.effects);
    narrative.push(...dayClosure.narrative);

    return {
      state,
      eventHistory: history,
      result: {
        dayAction: null,
        narrative,
        statChanges,
        triggeredEvent: null,
        unlocks: [],
        dayAdvanced: true
      }
    };
  }

  if (!input.dayAction) {
    throw new Error("dayAction is required when no event is pending.");
  }

  const actionResult = resolveAction(input.dayAction);
  state = applyEffects(state, actionResult.effects);
  statChanges.push(...actionResult.effects);
  narrative.push(actionResult.narrative);

  const event = selectEvent(state, history, events);
  if (event) {
    state.pendingEventId = event.id;
    narrative.push(`Event triggered: ${event.title}`);
    return {
      state,
      eventHistory: history,
      result: {
        dayAction: input.dayAction,
        narrative,
        statChanges,
        triggeredEvent: toEventView(event),
        unlocks: [],
        dayAdvanced: false
      }
    };
  }

  const dayClosure = endOfDay(state);
  state = dayClosure.state;
  statChanges.push(...dayClosure.effects);
  narrative.push(...dayClosure.narrative);

  return {
    state,
    eventHistory: history,
    result: {
      dayAction: input.dayAction,
      narrative,
      statChanges,
      triggeredEvent: null,
      unlocks: [],
      dayAdvanced: true
    }
  };
}
