"use client";

import { createContext, useContext, useReducer, useMemo } from "react";

import {
  Action,
  SearchContextType,
  SearchResult,
  SearchType,
  State,
} from "./SearchContext.types";

const initialState: State = {
  searchType: SearchType.PEOPLE,
  searchTerm: "",
  isSearching: false,
  error: false,
  results: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SEARCH_START":
      return { ...state, isSearching: true, error: false };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        isSearching: false,
        error: false,
        results: action.payload,
      };
    case "SEARCH_ERROR":
      return { ...state, isSearching: false, error: true };
    default:
      return state;
  }
};

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      ...state,
      setSearchType: (type: SearchType) =>
        dispatch({ type: "SET_SEARCH_TYPE", payload: type }),
      setSearchTerm: (term: string) =>
        dispatch({ type: "SET_SEARCH_TERM", payload: term }),
      startSearch: () => dispatch({ type: "SEARCH_START" }),
      setSearchSuccess: (results: SearchResult[]) =>
        dispatch({ type: "SEARCH_SUCCESS", payload: results }),
      setSearchError: () => dispatch({ type: "SEARCH_ERROR" }),
    }),
    [state]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
