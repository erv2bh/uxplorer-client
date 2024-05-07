import { vi, describe, it, afterEach, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SubmissionCheck from "../../components/NewTest/SubmissionCheck";
import {
  testDetailAtom,
  missionAtom,
  errorMessageAtom,
} from "../../atoms/atoms";

const mocks = vi.hoisted(() => ({
  errorMessage: "",
  missions: [
    {
      id: "1",
      description: "Complete user interface",
      expectedDuration: "120",
    },
    { id: "2", description: "Implement backend API", expectedDuration: "240" },
  ],
  testDetail: {
    testName: "New Platform Development",
    testDescription: "A test for developing new platform features",
    testUrl: "http://example.com/test",
    testerEmails: ["test1@example.com", "test2@example.com"],
    testDeadline: "2024-01-01",
  },
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === missionAtom) return mocks.missions;
      if (atom === testDetailAtom) return mocks.testDetail;
      return undefined;
    },
    useAtom: (atom) => {
      if (atom === errorMessageAtom) return [mocks.errorMessage, vi.fn()];
      return [undefined, vi.fn()];
    },
  };
});

vi.mock("../../apis/usePostTest", () => ({
  default: () => ({
    saveTestWithMissions: vi.fn(),
    loading: false,
  }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

const queryClient = new QueryClient();

describe("SubmissionCheck Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders form with test and mission details", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SubmissionCheck />
      </QueryClientProvider>,
    );

    expect(screen.getByText("New Platform Development")).toBeInTheDocument();
    expect(screen.getByText("Complete user interface")).toBeInTheDocument();
  });
});
