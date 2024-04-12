import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "../../components/Header";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const queryClient = new QueryClient();

describe("Header 컴포넌트", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  it("로딩 중이 아닐 때 헤더 UI가 정상적으로 렌더링됩니다", () => {
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("로그아웃")).toBeInTheDocument();
  });
});
