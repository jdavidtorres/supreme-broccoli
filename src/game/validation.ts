import type { EventDefinition } from "../shared/types";

export function validateEvents(events: EventDefinition[]): void {
  const ids = new Set<string>();
  for (const event of events) {
    if (ids.has(event.id)) {
      throw new Error(`Duplicate event id: ${event.id}`);
    }
    ids.add(event.id);
    if (event.options.length === 0) {
      throw new Error(`Event '${event.id}' must define at least one option.`);
    }
  }
}
