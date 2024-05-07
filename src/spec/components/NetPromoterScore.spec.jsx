import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Doughnut } from "react-chartjs-2";

import NetPromoterScore from "../../components/charts/NetPromoterScore";
import { surveyResultsAtom } from "../../atoms/atoms";

const mocks = vi.hoisted(() => ({
  surveyResults: [{ NPS: 10 }, { NPS: 9 }],
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === surveyResultsAtom) return mocks.surveyResults;
      return undefined;
    },
  };
});

vi.mock("react-chartjs-2", () => ({
  Doughnut: vi.fn(() => null),
}));

describe("NetPromoterScore Component", () => {
  it("renders the NPS score and chart with the correct data", () => {
    render(<NetPromoterScore />);

    const npsScoreText = screen.getByText(/NPS 점수:/);
    expect(npsScoreText).toBeInTheDocument();
    expect(npsScoreText.textContent).toContain("100");

    expect(Doughnut).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          labels: ["추천 그룹", "중립 그룹", "비추천 그룹"],
          datasets: expect.arrayContaining([
            expect.objectContaining({
              data: [20, 20, 60],
            }),
          ]),
        }),
        options: expect.anything(),
      }),
      expect.anything(),
    );
  });

  it("displays correct NPS description based on the score", () => {
    render(<NetPromoterScore />);

    expect(
      screen.getByText(
        /NPS 점수는 기업이나 제품의 고객 충성도와 만족도를 간단하면서도 효과적으로 측정하는 지표입니다./,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/70점 이상:/)).toBeInTheDocument();
    expect(screen.getByText(/50점에서 69점 사이:/)).toBeInTheDocument();
    expect(screen.getByText(/0점에서 49점 사이:/)).toBeInTheDocument();
    expect(screen.getByText(/0점 미만:/)).toBeInTheDocument();
  });
});
