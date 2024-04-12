import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import SearchNavigation from "../../components/Navigation/SearchNavigation";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("SearchNavigation 컴포넌트", () => {
  it("입력창이 렌더링됩니다", () => {
    render(
      <MemoryRouter>
        <SearchNavigation />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("테스트 이름을 입력해주세요.");
    expect(input).toBeInTheDocument();
  });

  it("+ 새 테스트 버튼이 렌더링됩니다", () => {
    render(
      <MemoryRouter>
        <SearchNavigation />
      </MemoryRouter>,
    );

    const newTestButton = screen.getByText("+ 새 테스트");
    expect(newTestButton).toBeInTheDocument();
  });
});
