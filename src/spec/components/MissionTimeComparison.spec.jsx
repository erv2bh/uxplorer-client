import { describe, it, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import { Bar } from "react-chartjs-2";

import MissionTimeComparison from "../../components/charts/MissionTimeComparison";
import { missionsDataAtom, completedMissionDataAtom } from "../../atoms/atoms";

const mocks = vi.hoisted(() => ({
  missionsData: [
    { order: 1, expectedDuration: 30, _id: "m1" },
    { order: 2, expectedDuration: 45, _id: "m2" },
  ],
  completedMissionData: [
    { order: 1, completedBy: { duration: 25 } },
    { order: 1, completedBy: { duration: 35 } },
    { order: 2, completedBy: { duration: 50 } },
    { order: 2, completedBy: { duration: 40 } },
  ],
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === missionsDataAtom) return mocks.missionsData;
      if (atom === completedMissionDataAtom) return mocks.completedMissionData;
      return undefined;
    },
  };
});

vi.mock("react-chartjs-2", () => ({
  Bar: vi.fn(() => null),
}));

describe("MissionTimeComparison Component", () => {
  it("calculates and passes the correct data to the Bar chart", () => {
    render(<MissionTimeComparison />);

    const expectedLabels = ["미션 1", "미션 2"];
    const actualAverages = [30, 45];
    const expectedDurations = [30, 45];

    expect(Bar).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          labels: expectedLabels,
          datasets: expect.arrayContaining([
            expect.objectContaining({ data: actualAverages }),
            expect.objectContaining({ data: expectedDurations }),
          ]),
        }),
      }),
      expect.anything(),
    );
  });
});
