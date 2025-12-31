import { Movie } from "./movies";

export type PersonMovie = Pick<Movie, "id" | "title">;

export type Person = {
  id: string;
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  movies: PersonMovie[];
};
