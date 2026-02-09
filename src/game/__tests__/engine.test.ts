import { describe, expect, it } from "vitest";
import { createInitialState } from "../state";
import { applyAction } from "../engine";
import { MVP_EVENTS } from "../content";

describe("engine daily flow", () => {
  it("requires event resolution before day advances", () => {
    const initial = createInitialState();
    const step1 = applyAction(
      {
        state: initial,
        eventHistory: {}
      },
      {
        dayAction: "WORK",
        events: [MVP_EVENTS[0]]
      }
    );

    expect(step1.state.pendingEventId).toBe(MVP_EVENTS[0].id);
    expect(step1.result.dayAdvanced).toBe(false);

    const optionId = MVP_EVENTS[0].options[0].id;
    const step2 = applyAction(
      {
        state: step1.state,
        eventHistory: step1.eventHistory
      },
      {
        eventOptionId: optionId,
        events: [MVP_EVENTS[0]]
      }
    );

    expect(step2.state.day).toBe(2);
    expect(step2.state.pendingEventId).toBeNull();
    expect(step2.result.dayAdvanced).toBe(true);
  });
});
