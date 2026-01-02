import { render, screen } from "@testing-library/react";

import SearchPage from "./SearchPage";

// Mock the SearchProvider and child components
jest.mock("@/context/SearchContext", () => ({
  SearchProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="search-provider">{children}</div>
  ),
}));

jest.mock("./components/ResultsArea", () => {
  return function MockResultsArea() {
    return <div data-testid="results-area">Results Area</div>;
  };
});

jest.mock("./components/SearchForm", () => {
  return function MockSearchForm() {
    return <div data-testid="search-form">Search Form</div>;
  };
});

describe("SearchPage", () => {
  it("should render SearchProvider", () => {
    render(<SearchPage />);

    expect(screen.getByTestId("search-provider")).toBeInTheDocument();
  });

  it("should render SearchForm", () => {
    render(<SearchPage />);

    expect(screen.getByTestId("search-form")).toBeInTheDocument();
  });

  it("should render ResultsArea", () => {
    render(<SearchPage />);

    expect(screen.getByTestId("results-area")).toBeInTheDocument();
  });

  it("should render both SearchForm and ResultsArea inside SearchProvider", () => {
    render(<SearchPage />);

    const provider = screen.getByTestId("search-provider");
    const searchForm = screen.getByTestId("search-form");
    const resultsArea = screen.getByTestId("results-area");

    expect(provider).toBeInTheDocument();
    expect(provider).toContainElement(searchForm);
    expect(provider).toContainElement(resultsArea);
  });

  it("should have proper container structure", () => {
    const { container } = render(<SearchPage />);

    const mainContainer = container.querySelector(".w-\\[511px\\]");

    expect(mainContainer).toBeInTheDocument();
  });
});
