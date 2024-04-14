import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "../../components/Login";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../../../apis/usePostTesterLogin", () => ({
  usePostTesterLogin: () => vi.fn(),
}));

const queryClient = new QueryClient();

describe("Login 컴포넌트", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  it("초기 렌더링과 사용자 입력 처리를 검증합니다", () => {
    const testerIdInput = screen.getByPlaceholderText("테스터 아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");

    fireEvent.change(testerIdInput, { target: { value: "tester" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(testerIdInput.value).toBe("tester");
    expect(passwordInput.value).toBe("password");
  });
});
