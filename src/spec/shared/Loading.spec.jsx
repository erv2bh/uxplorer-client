import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "../../components/shared/Loading";

describe("Loading 컴포넌트", () => {
  it("정상적으로 렌더링되어야 합니다", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
