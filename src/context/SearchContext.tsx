"use client";

import { createContext, useContext, useState } from "react";

type SearchType = "people" | "movies";

type SearchContextType = {
  searchType: SearchType;
  setSearchType: (searchType: SearchType) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
};

const SearchContext = createContext<SearchContextType>({
  searchType: "people",
  setSearchType: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  isSearching: false,
  setIsSearching: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchType, setSearchType] = useState<SearchType>("people");

  const [searchTerm, setSearchTerm] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchType,
        setSearchType,
        searchTerm,
        setSearchTerm,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
