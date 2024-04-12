import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { useNavigate } from "react-router-dom";

import Onboarding from "../../components/Onboarding";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../../apis/usePostGoogleLogin", () => ({
  usePostGoogleLogin: () => ({
    fetchGoogleLogin: vi.fn(),
    isPending: false,
  }),
}));

const queryClient = new QueryClient();

describe("Onboarding 컴포넌트", () => {
  it("올바르게 렌더링됩니다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Onboarding />
      </QueryClientProvider>,
    );

    expect(screen.getByAltText("UXplorer Logo")).toBeInTheDocument();
    expect(screen.getByText("기업 로그인")).toBeInTheDocument();
    expect(screen.getByText("테스터 로그인")).toBeInTheDocument();
  });

  it("테스터 로그인 버튼을 클릭하면 로그인 페이지로 이동합니다", () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockImplementation(() => mockNavigate);

    render(
      <QueryClientProvider client={queryClient}>
        <Onboarding />
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByText("테스터 로그인"));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
