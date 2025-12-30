"use client";

import { createContext, useContext, useState } from "react";

import {
  SearchContextType,
  SearchResult,
  SearchType,
} from "./SearchContext.types";

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.PEOPLE);

  const [searchTerm, setSearchTerm] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  const [resultType, setResultType] = useState<SearchType>(SearchType.PEOPLE);

  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <SearchContext.Provider
      value={{
        searchType,
        setSearchType,
        searchTerm,
        setSearchTerm,
        isSearching,
        setIsSearching,
        resultType,
        setResultType,
        results,
        setResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export { SearchType };
