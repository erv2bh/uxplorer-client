import { vi, describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Survey from "../../components/UserTest/Survey";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../../constants/constant", () => ({
  default: {
    surveyQuestions: [
      "이 시스템을 자주 이용하고 싶다는 생각이 듭니다.",
      "시스템이 불필요하게 복잡하다는 것을 알았습니다.",
      "시스템을 사용하기 쉽다고 생각합니다.",
      "이 시스템을 사용하려면 기술자의 지원이 필요하다고 생각합니다.",
      "이 시스템의 다양한 기능이 잘 통합되어 있다는 것을 알았습니다.",
      "이 시스템에 너무 많은 불일치가 있다고 생각했습니다.",
      "나는 대부분의 사람들이 이 시스템을 매우 빨리 사용하는 법을 배울 것이라고 상상합니다.",
      "시스템을 사용하기가 매우 복잡하다는 것을 알았습니다.",
      "나는 시스템을 사용하여 매우 자신감을 느꼈습니다.",
      "이 시스템을 사용하기 전에 많은 것을 배워야 했습니다.",
    ],
    surveyOptions: ["매우 아니다", "아니다", "보통", "그렇다", "매우 그렇다"],
  },
}));

vi.mock("../../apis/usePostSurveys", () => ({
  default: () => ({
    saveSurveyData: vi.fn(),
    isPending: false,
  }),
}));

describe("Survey Component", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders all questions and options correctly", () => {
    render(
      <MemoryRouter>
        <Survey />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("1. 이 시스템을 자주 이용하고 싶다는 생각이 듭니다."),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio").length).toBe(50);
  });

  it("handles option change correctly", () => {
    render(
      <MemoryRouter>
        <Survey />
      </MemoryRouter>,
    );

    const firstQuestionOptions = screen.getAllByRole("radio");
    fireEvent.click(firstQuestionOptions[1]);
    expect(firstQuestionOptions[1]).toBeChecked();
  });
});
