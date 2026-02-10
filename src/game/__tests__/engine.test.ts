import { describe, expect, it } from "vitest";
import { createInitialState } from "../state";
import { applyAction } from "../engine";
import { MVP_EVENTS } from "../content";

describe("engine daily flow", () => {
  it("requires event resolution before time advances", () => {
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
    // WORK action takes 4 hours, so clock should advance from 9 to 13
    expect(step1.state.clock.hour).toBe(13);
    expect(step1.state.clock.day).toBe(1); // Still day 1

    const optionId = MVP_EVENTS[0].options[0].id;
    const step2 = applyAction(
      {
        state: step1.state,
        eventHistory: step1.eventHistory
      },
      {
        eventOptionId: optionId,
        events: [MVP_EVENTS[0]] // Pass the event to resolve it
      }
    );

    // Event resolution takes 1 hour, so clock should be at 14
    expect(step2.state.clock.hour).toBe(14);
    expect(step2.state.clock.day).toBe(1); // Still day 1, hasn't reached 22:00 yet
    expect(step2.state.day).toBe(1); // Day counter stays at 1
    expect(step2.state.pendingEventId).toBeNull();
    expect(step2.result.dayAdvanced).toBe(false); // Day doesn't advance until 22:00
  });

  it("advances day when actions reach end of day", () => {
    const initial = createInitialState();
    // Starting at 9:00, do multiple actions to reach past 22:00
    // CONTRACT takes 5 hours (9->14)
    const step1 = applyAction(
      { state: initial, eventHistory: {} },
      { dayAction: "CONTRACT", events: [] }
    );
    expect(step1.state.clock.hour).toBe(14);
    expect(step1.state.clock.day).toBe(1);

    // CONTRACT again takes 5 hours (14->19)
    const step2 = applyAction(
      { state: step1.state, eventHistory: step1.eventHistory },
      { dayAction: "CONTRACT", events: [] }
    );
    expect(step2.state.clock.hour).toBe(19);
    expect(step2.state.clock.day).toBe(1);

    // WORK takes 4 hours (19->23, which wraps to next day at 10am)
    const step3 = applyAction(
      { state: step2.state, eventHistory: step2.eventHistory },
      { dayAction: "WORK", events: [] }
    );
    expect(step3.state.clock.day).toBe(2); // Day advanced!
    expect(step3.state.clock.hour).toBe(10); // 19 + 4 = 23, wraps to 10am next day
    expect(step3.state.day).toBe(2); // Day counter advanced
    expect(step3.result.dayAdvanced).toBe(true);
  });
});
