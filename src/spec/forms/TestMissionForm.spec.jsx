import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import TestMissionForm from "../../components/NewTest/TestMissionForm";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("TestMissionForm 컴포넌트", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <TestMissionForm />
      </MemoryRouter>,
    );
  });

  it("미션 추가 버튼이 미션을 추가합니다", () => {
    const addButton = screen.getByText("미션 추가");
    fireEvent.click(addButton);

    const inputFields = screen.getAllByPlaceholderText("미션을 입력해주세요.");
    expect(inputFields.length).toBeGreaterThan(0);
  });
});
