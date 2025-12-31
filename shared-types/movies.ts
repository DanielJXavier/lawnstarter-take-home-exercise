import { Person } from "./people";

export type MoviePerson = Pick<Person, "id" | "name">;

export type Movie = {
  id: string;
  title: string;
  opening_crawl: string;
  characters: MoviePerson[];
};
