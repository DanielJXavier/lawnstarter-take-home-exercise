import { Dispatch, SetStateAction } from "react";

export enum SearchType {
  PEOPLE = "people",
  MOVIES = "movies",
}

export type SearchResult = {
  uid: string;
  name?: string;
  title?: string;
};

export type SearchContextType = {
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
};
