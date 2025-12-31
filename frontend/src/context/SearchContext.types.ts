import { Dispatch, SetStateAction } from "react";

export enum SearchType {
  PEOPLE = "people",
  MOVIES = "movies",
}

export type SearchResult =
  | {
      type: SearchType.PEOPLE;
      id: string;
      name: string;
    }
  | {
      type: SearchType.MOVIES;
      id: string;
      title: string;
    };

export type SearchContextType = {
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  results: SearchResult[];
  setResults: Dispatch<SetStateAction<SearchResult[]>>;
};
