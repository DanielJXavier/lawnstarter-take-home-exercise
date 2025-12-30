import { Dispatch, SetStateAction } from "react";

export enum SearchType {
  PEOPLE = "people",
  MOVIES = "movies",
}

export type SearchResult =
  | {
      type: SearchType.PEOPLE;
      uid: string;
      name: string;
    }
  | {
      type: SearchType.MOVIES;
      uid: string;
      title: string;
    };

export type SearchContextType = {
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  results: SearchResult[];
  setResults: Dispatch<SetStateAction<SearchResult[]>>;
};
