import { render, screen } from "@testing-library/react";

import React from "react";

import { SearchProvider, useSearchContext } from "@/context/SearchContext";
import { SearchType, SearchResult } from "@/context/SearchContext.types";

import ResultsContent from "./ResultsContent";

describe("ResultsContent", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SearchProvider>{children}</SearchProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display "Searching..." when isSearching is true', () => {
    const TestComponent = () => {
      const context = useSearchContext();

      // Trigger searching state
      React.useEffect(() => {
        context.startSearch();
      }, []);

      return <ResultsContent />;
    };

    render(<TestComponent />, { wrapper });

    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("should display error message when error is true", () => {
    const TestComponent = () => {
      const context = useSearchContext();

      React.useEffect(() => {
        context.setSearchError();
      }, []);

      return <ResultsContent />;
    };

    render(<TestComponent />, { wrapper });

    expect(screen.getByText(/Oh no! An error occurred/)).toBeInTheDocument();
    expect(screen.getByText(/Please try again/)).toBeInTheDocument();
  });

  it('should display "zero matches" message when results are empty', () => {
    render(<ResultsContent />, { wrapper });

    expect(screen.getByText(/There are zero matches/)).toBeInTheDocument();
    expect(
      screen.getByText(/Use the form to search for People or Movies/)
    ).toBeInTheDocument();
  });

  it("should display people results with SEE DETAILS links", () => {
    const TestComponent = () => {
      const context = useSearchContext();

      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
        { type: SearchType.PEOPLE, id: "2", name: "Darth Vader" },
      ];

      React.useEffect(() => {
        context.setSearchSuccess(mockResults);
      }, []);

      return <ResultsContent />;
    };

    render(<TestComponent />, { wrapper });

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();

    const links = screen.getAllByText("SEE DETAILS");

    expect(links).toHaveLength(2);
    expect(links[0].closest("a")).toHaveAttribute("href", "/people/1");
    expect(links[1].closest("a")).toHaveAttribute("href", "/people/2");
  });

  it("should display movie results with titles", () => {
    const TestComponent = () => {
      const context = useSearchContext();

      const mockResults: SearchResult[] = [
        { type: SearchType.MOVIES, id: "1", title: "A New Hope" },
        { type: SearchType.MOVIES, id: "4", title: "The Phantom Menace" },
      ];

      React.useEffect(() => {
        context.setSearchSuccess(mockResults);
      }, []);

      return <ResultsContent />;
    };

    render(<TestComponent />, { wrapper });

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("The Phantom Menace")).toBeInTheDocument();

    const links = screen.getAllByText("SEE DETAILS");
    expect(links).toHaveLength(2);
    expect(links[0].closest("a")).toHaveAttribute("href", "/movies/1");
    expect(links[1].closest("a")).toHaveAttribute("href", "/movies/4");
  });

  it("should display single result", () => {
    const TestComponent = () => {
      const context = useSearchContext();

      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
      ];

      React.useEffect(() => {
        context.setSearchSuccess(mockResults);
      }, []);

      return <ResultsContent />;
    };

    render(<TestComponent />, { wrapper });

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("should render horizontal separators between results", () => {
    const TestComponent = () => {
      const context = useSearchContext();

      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
        { type: SearchType.PEOPLE, id: "2", name: "Darth Vader" },
      ];

      React.useEffect(() => {
        context.setSearchSuccess(mockResults);
      }, []);

      return <ResultsContent />;
    };

    const { container } = render(<TestComponent />, { wrapper });

    const separators = container.querySelectorAll("hr");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("should handle mixed people and movie results", () => {
    const TestComponent = () => {
      const context = useSearchContext();

      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
        { type: SearchType.MOVIES, id: "2", title: "A New Hope" },
      ];

      React.useEffect(() => {
        context.setSearchSuccess(mockResults);
      }, []);

      return <ResultsContent />;
    };

    render(<TestComponent />, { wrapper });

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
  });

  it("should show correct link for each result type", () => {
    const TestComponent = () => {
      const context = useSearchContext();

      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "10", name: "Yoda" },
        { type: SearchType.MOVIES, id: "5", title: "Attack of the Clones" },
      ];

      React.useEffect(() => {
        context.setSearchSuccess(mockResults);
      }, []);

      return <ResultsContent />;
    };

    render(<TestComponent />, { wrapper });

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/people/10");
    expect(links[1]).toHaveAttribute("href", "/movies/5");
  });
});
