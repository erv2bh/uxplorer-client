import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NewTestNavigation from "../../components/Navigation/NewTestNavigation";

describe("NewTestNavigation", () => {
  it("테스트 정보가 하이라이트 되어야 함", () => {
    render(
      <MemoryRouter initialEntries={["/test-detail"]}>
        <NewTestNavigation />
      </MemoryRouter>,
    );

    const text = screen.getByText("테스트 정보");
    expect(text).toHaveStyle("color: #133341");
    expect(text).toHaveStyle("font-weight: bold");
  });

  it("테스트 미션과 최종 확인은 하이라이트 되지 않아야 함", () => {
    render(
      <MemoryRouter initialEntries={["/test-detail"]}>
        <NewTestNavigation />
      </MemoryRouter>,
    );

    const testMissionText = screen.getByText("테스트 미션");
    const submissionCheckText = screen.getByText("최종 확인");
    expect(testMissionText).toHaveStyle("color: #355e70");
    expect(submissionCheckText).toHaveStyle("color: #355e70");
  });

  it("다른 경로에서 렌더링 테스트", () => {
    render(
      <MemoryRouter initialEntries={["/test-mission"]}>
        <NewTestNavigation />
      </MemoryRouter>,
    );

    const testDetailText = screen.getByText("테스트 정보");
    const testMissionText = screen.getByText("테스트 미션");
    expect(testDetailText).toHaveStyle("color: #355e70");
    expect(testMissionText).toHaveStyle("color: #133341");
    expect(testMissionText).toHaveStyle("font-weight: bold");
  });
});
