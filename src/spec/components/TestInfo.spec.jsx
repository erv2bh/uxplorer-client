import { vi, describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import TestInfo from "../../components/TestDetail/TestInfo";
import {
  currentTestDataAtom,
  missionsDataAtom,
  testerDataAtom,
} from "../../atoms/atoms";

const mocks = vi.hoisted(() => ({
  testDetail: {
    title: "UI/UX Test",
    description: "Complete the interface checks",
    testUrl: "http://example.com/test",
    deadline: "2024-01-01",
    testerEmails: [
      { testerEmail: "user1@example.com" },
      { testerEmail: "user2@example.com" },
    ],
  },
  missions: [
    { _id: "1", description: "Check responsiveness", expectedDuration: "120" },
    { _id: "2", description: "Verify color scheme", expectedDuration: "80" },
  ],
  isTestExpired: false,
  isPending: false,
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === currentTestDataAtom) return mocks.testDetail;
      if (atom === testerDataAtom) return mocks.testDetail.testerEmails;
      if (atom === missionsDataAtom) return mocks.missions;
      return undefined;
    },
    useSetAtom: () => vi.fn(),
  };
});

vi.mock("../../apis/useDeleteTest", () => ({
  default: () => ({
    fetchDeleteTest: vi.fn(),
    isPending: mocks.isPending,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("TestInfo Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders test details correctly", () => {
    render(
      <MemoryRouter>
        <TestInfo />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Complete the interface checks"),
    ).toBeInTheDocument();
    expect(screen.getByText("http://example.com/test")).toBeInTheDocument();
    expect(screen.getByText("1. user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("2. user2@example.com")).toBeInTheDocument();
    expect(screen.getByText("2024년 1월 1일")).toBeInTheDocument(); // Using mock formatDate
  });

  it("displays missions correctly", () => {
    render(
      <MemoryRouter>
        <TestInfo />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("미션 1: Check responsiveness"),
    ).toBeInTheDocument();
    expect(screen.getByText("예상 소요 시간: 120 초")).toBeInTheDocument();
    expect(screen.getByText("미션 2: Verify color scheme")).toBeInTheDocument();
    expect(screen.getByText("예상 소요 시간: 80 초")).toBeInTheDocument();
  });
});
