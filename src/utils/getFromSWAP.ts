import {
  MoviesSearchResult,
  PeopleSearchResult,
} from "../app/api/search/types";

import { SearchType } from "../context/SearchContext.types";

const BASE_SWAP_URL = "https://swapi.tech/api";

export const getFromSWAP = async (type: string, term: string) => {
  const isPeople = type === SearchType.PEOPLE;

  const targetUrl = isPeople
    ? `${BASE_SWAP_URL}/people/?name=${term}`
    : `${BASE_SWAP_URL}/films/?title=${term}`;

  const response = await fetch(targetUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  const { message, result } = await response.json();

  if (message !== "ok") {
    return Response.json({ message: `Failed to fetch ${type}` });
  }

  if (isPeople) {
    return result.map((result: PeopleSearchResult) => ({
      type: SearchType.PEOPLE,
      uid: result.uid,
      name: result.properties.name,
    }));
  } else {
    return result.map((result: MoviesSearchResult) => ({
      type: SearchType.MOVIES,
      uid: result.uid,
      title: result.properties.title,
    }));
  }
};
