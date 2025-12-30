import { BASE_SWAPI_URL } from "../app/api/constants";
import { PeopleResult, MoviesResult } from "../app/api/types";

import { SearchType } from "../context/SearchContext.types";

export const searchFromSWAPI = async (type: string, term: string) => {
  const isPeople = type === SearchType.PEOPLE;

  const targetUrl = isPeople
    ? `${BASE_SWAPI_URL}/people/?name=${term}`
    : `${BASE_SWAPI_URL}/films/?title=${term}`;

  const response = await fetch(targetUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  const { message, result } = await response.json();

  if (message !== "ok") {
    return Response.json({ message: `Failed to fetch ${type}` });
  }

  if (isPeople) {
    return result.map((result: PeopleResult) => ({
      type: SearchType.PEOPLE,
      uid: result.uid,
      name: result.properties.name,
    }));
  } else {
    return result.map((result: MoviesResult) => ({
      type: SearchType.MOVIES,
      uid: result.uid,
      title: result.properties.title,
    }));
  }
};
