import { render, screen } from "@testing-library/react";

import ResultsArea from "./ResultsArea";

// Mock ResultsContent component
jest.mock("./ResultsContent", () => {
  return function MockResultsContent() {
    return <div data-testid="results-content">Results Content</div>;
  };
});

describe("ResultsArea", () => {
  it("should render Results title", () => {
    render(<ResultsArea />);

    expect(screen.getByText("Results")).toBeInTheDocument();
  });

  it("should render ResultsContent component", () => {
    render(<ResultsArea />);

    expect(screen.getByTestId("results-content")).toBeInTheDocument();
  });

  it("should have proper container structure", () => {
    const { container } = render(<ResultsArea />);

    const mainContainer = container.querySelector(".w-\\[291px\\]");
    expect(mainContainer).toBeInTheDocument();
  });

  it("should render horizontal rule separator", () => {
    const { container } = render(<ResultsArea />);

    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });

  it("should contain Results title and separator before content", () => {
    render(<ResultsArea />);

    const title = screen.getByText("Results");
    const content = screen.getByTestId("results-content");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
