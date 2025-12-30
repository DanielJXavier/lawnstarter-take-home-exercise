import { SearchType } from "@/src/context/SearchContext.types";

import { MoviesSearchResult, PeopleSearchResult } from "./types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");
  const term = searchParams.get("term");

  if (type === SearchType.PEOPLE) {
    const response = await fetch(`https://swapi.tech/api/people/?name=${term}`);

    if (!response.ok) {
      throw new Error("Failed to fetch people");
    }

    const data = await response.json();

    if (data.message !== "ok") {
      return Response.json({ message: "Failed to fetch people" });
    }

    const results = data.result.map((result: PeopleSearchResult) => ({
      uid: result.uid,
      name: result.properties.name,
    }));

    return Response.json({ results });
  } else if (type === SearchType.MOVIES) {
    const response = await fetch(`https://swapi.tech/api/films/?title=${term}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    if (data.message !== "ok") {
      return Response.json({ message: "Failed to fetch movies" });
    }

    const results = data.result.map((result: MoviesSearchResult) => ({
      uid: result.uid,
      title: result.properties.title,
    }));

    return Response.json({ results });
  }

  return Response.json({ message: "Invalid search type" });
}
