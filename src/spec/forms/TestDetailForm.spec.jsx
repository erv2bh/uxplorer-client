import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import TestDetailForm from "../../components/NewTest/TestDetailForm";

describe("TestDetailForm 컴포넌트", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <TestDetailForm />
      </MemoryRouter>,
    );
  });

  it("테스트 이름 입력 필드가 올바르게 렌더링됩니다", () => {
    const testNameInput =
      screen.getByPlaceholderText("테스트 이름을 입력해주세요.");
    expect(testNameInput).toBeInTheDocument();
  });

  it("테스트 설명 입력 필드가 올바르게 렌더링됩니다", () => {
    const testDescriptionTextarea =
      screen.getByPlaceholderText("테스트 설명을 입력해주세요.");
    expect(testDescriptionTextarea).toBeInTheDocument();
  });

  it("테스트 URL 입력 필드가 올바르게 렌더링됩니다", () => {
    const testUrlInput =
      screen.getByPlaceholderText("테스트 URL을 입력해주세요.");
    expect(testUrlInput).toBeInTheDocument();
  });

  it("인원 수 증감 버튼이 정상 작동합니다", () => {
    const decreaseButton = screen.getAllByRole("button", { name: "-" })[0];
    const increaseButton = screen.getAllByRole("button", { name: "+" })[0];
    const participantCountDisplay = screen.getByText("1");

    fireEvent.click(increaseButton);
    expect(participantCountDisplay).toHaveTextContent("2");

    fireEvent.click(decreaseButton);
    expect(participantCountDisplay).toHaveTextContent("1");
  });

  it("테스트 마감 날짜 입력 필드가 올바르게 렌더링됩니다", () => {
    const testDeadlineInput = screen.getByLabelText("테스트 마감 날짜");
    expect(testDeadlineInput).toBeInTheDocument();
  });
}, 5000);
