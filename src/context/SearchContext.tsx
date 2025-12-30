"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export enum SearchType {
  PEOPLE = "people",
  MOVIES = "movies",
}

type SearchContextType = {
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.PEOPLE);

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
