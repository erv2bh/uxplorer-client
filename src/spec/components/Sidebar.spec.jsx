import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useParams: () => ({ testId: "1" }),
    useNavigate: vi.fn(),
    useLocation: () => ({
      pathname: "/test/1/test-info",
    }),
  };
});

describe("Sidebar 컴포넌트", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("테스트 정보와 테스트 결과를 렌더링합니다", () => {
    expect(screen.getByText("테스트 정보")).toBeInTheDocument();
    expect(screen.getByText("테스트 결과")).toBeInTheDocument();
  });

  it("테스트 정보 클릭 시 올바른 테스트 정보 경로로 네비게이션합니다", () => {
    const testInfoLink = screen.getByText("테스트 정보");
    fireEvent.click(testInfoLink);
    expect(mockNavigate).toHaveBeenCalledWith("/test/1/test-info");
  });

  it("테스트 결과 클릭 시 올바른 테스트 결과 경로로 네비게이션합니다", () => {
    const testResultLink = screen.getByText("테스트 결과");
    fireEvent.click(testResultLink);
    expect(mockNavigate).toHaveBeenCalledWith(
      "/test/1/test-result/total-results",
    );
  });
});
