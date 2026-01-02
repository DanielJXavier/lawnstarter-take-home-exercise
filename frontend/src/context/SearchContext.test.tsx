import { renderHook, act } from "@testing-library/react";

import { SearchProvider, useSearchContext, reducer } from "./SearchContext";
import { SearchType, SearchResult, State } from "./SearchContext.types";

describe("SearchContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SearchProvider>{children}</SearchProvider>
  );

  describe("Initial State", () => {
    it("should have correct initial values", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      expect(result.current.searchType).toBe(SearchType.PEOPLE);
      expect(result.current.searchTerm).toBe("");
      expect(result.current.isSearching).toBe(false);
      expect(result.current.error).toBe(false);
      expect(result.current.results).toEqual([]);
    });
  });

  describe("setSearchType", () => {
    it("should update search type to MOVIES", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.setSearchType(SearchType.MOVIES);
      });

      expect(result.current.searchType).toBe(SearchType.MOVIES);
    });

    it("should update search type to PEOPLE", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.setSearchType(SearchType.MOVIES);
        result.current.setSearchType(SearchType.PEOPLE);
      });

      expect(result.current.searchType).toBe(SearchType.PEOPLE);
    });
  });

  describe("setSearchTerm", () => {
    it("should update search term", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.setSearchTerm("Luke");
      });

      expect(result.current.searchTerm).toBe("Luke");
    });

    it("should update search term multiple times", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.setSearchTerm("Luke");
      });

      expect(result.current.searchTerm).toBe("Luke");

      act(() => {
        result.current.setSearchTerm("Luke Skywalker");
      });

      expect(result.current.searchTerm).toBe("Luke Skywalker");
    });
  });

  describe("startSearch", () => {
    it("should set isSearching to true and error to false", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.startSearch();
      });

      expect(result.current.isSearching).toBe(true);
      expect(result.current.error).toBe(false);
    });

    it("should clear previous error when starting new search", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.setSearchError();
      });

      expect(result.current.error).toBe(true);

      act(() => {
        result.current.startSearch();
      });

      expect(result.current.error).toBe(false);
      expect(result.current.isSearching).toBe(true);
    });
  });

  describe("setSearchSuccess", () => {
    it("should set results and clear loading/error states", () => {
      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
        { type: SearchType.PEOPLE, id: "2", name: "Darth Vader" },
      ];

      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.startSearch();
      });

      act(() => {
        result.current.setSearchSuccess(mockResults);
      });

      expect(result.current.isSearching).toBe(false);
      expect(result.current.error).toBe(false);
      expect(result.current.results).toEqual(mockResults);
    });

    it("should handle empty results", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.setSearchSuccess([]);
      });

      expect(result.current.results).toEqual([]);
      expect(result.current.isSearching).toBe(false);
      expect(result.current.error).toBe(false);
    });

    it("should handle movie results", () => {
      const mockResults: SearchResult[] = [
        { type: SearchType.MOVIES, id: "1", title: "A New Hope" },
        { type: SearchType.MOVIES, id: "4", title: "The Phantom Menace" },
      ];

      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.setSearchSuccess(mockResults);
      });

      expect(result.current.results).toEqual(mockResults);
    });
  });

  describe("setSearchError", () => {
    it("should set error to true and isSearching to false", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      act(() => {
        result.current.startSearch();
      });

      expect(result.current.isSearching).toBe(true);

      act(() => {
        result.current.setSearchError();
      });

      expect(result.current.error).toBe(true);
      expect(result.current.isSearching).toBe(false);
    });
  });

  describe("reducer", () => {
    it("should return current state for unknown action type", () => {
      const state: State = {
        searchType: SearchType.PEOPLE,
        searchTerm: "test",
        isSearching: false,
        error: false,
        results: [],
      };

      // @ts-expect-error - Testing unknown action type
      const newState = reducer(state, { type: "UNKNOWN_ACTION" });

      expect(newState).toBe(state);
    });
  });

  describe("Integration scenarios", () => {
    it("should handle complete search flow with success", () => {
      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
      ];

      const { result } = renderHook(() => useSearchContext(), { wrapper });

      // Set search type and term
      act(() => {
        result.current.setSearchType(SearchType.PEOPLE);
        result.current.setSearchTerm("Luke");
      });

      expect(result.current.searchType).toBe(SearchType.PEOPLE);
      expect(result.current.searchTerm).toBe("Luke");

      // Start search
      act(() => {
        result.current.startSearch();
      });

      expect(result.current.isSearching).toBe(true);

      // Complete search
      act(() => {
        result.current.setSearchSuccess(mockResults);
      });

      expect(result.current.isSearching).toBe(false);
      expect(result.current.results).toEqual(mockResults);
    });

    it("should handle complete search flow with error", () => {
      const { result } = renderHook(() => useSearchContext(), { wrapper });

      // Set search type and term
      act(() => {
        result.current.setSearchType(SearchType.MOVIES);
        result.current.setSearchTerm("Invalid");
      });

      // Start search
      act(() => {
        result.current.startSearch();
      });

      expect(result.current.isSearching).toBe(true);

      // Error occurs
      act(() => {
        result.current.setSearchError();
      });

      expect(result.current.isSearching).toBe(false);
      expect(result.current.error).toBe(true);
    });

    it("should allow retry after error", () => {
      const mockResults: SearchResult[] = [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
      ];

      const { result } = renderHook(() => useSearchContext(), { wrapper });

      // First attempt fails
      act(() => {
        result.current.startSearch();
      });
      act(() => {
        result.current.setSearchError();
      });

      expect(result.current.error).toBe(true);

      // Retry succeeds
      act(() => {
        result.current.startSearch();
      });

      expect(result.current.error).toBe(false);

      act(() => {
        result.current.setSearchSuccess(mockResults);
      });

      expect(result.current.error).toBe(false);
      expect(result.current.results).toEqual(mockResults);
    });
  });
});
