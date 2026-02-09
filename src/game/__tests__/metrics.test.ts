import { describe, expect, it } from "vitest";
import { createInitialState } from "../state";
import { computeProductivity } from "../metrics";

describe("computeProductivity", () => {
  it("increases with better energy and skills", () => {
    const low = createInitialState();
    low.energy = 25;
    low.skills.backend = 1;
    low.skills.frontend = 1;

    const high = createInitialState();
    high.energy = 85;
    high.skills.backend = 4;
    high.skills.frontend = 4;

    expect(computeProductivity(high)).toBeGreaterThan(computeProductivity(low));
  });
});
