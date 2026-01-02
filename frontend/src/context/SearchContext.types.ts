export enum SearchType {
  PEOPLE = "people",
  MOVIES = "movies",
}

export type State = {
  searchType: SearchType;
  searchTerm: string;
  isSearching: boolean;
  error: boolean;
  results: SearchResult[];
};

export type Action =
  | { type: "SET_SEARCH_TYPE"; payload: SearchType }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SEARCH_START" }
  | { type: "SEARCH_SUCCESS"; payload: SearchResult[] }
  | { type: "SEARCH_ERROR" };

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
  setSearchType: (type: SearchType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  error: boolean;
  results: SearchResult[];
  startSearch: () => void;
  setSearchSuccess: (results: SearchResult[]) => void;
  setSearchError: () => void;
};
