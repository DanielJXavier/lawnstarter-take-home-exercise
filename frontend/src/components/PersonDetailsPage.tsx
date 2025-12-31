import { Fragment } from "react/jsx-runtime";

import Link from "next/link";

import { Person, BaseMovie } from "@/types";

import BaseDetailsPage from "./BaseDetailsPage";
import Section from "./Section";

export default function PersonDetailsPage({ person }: { person: Person }) {
  return (
    <BaseDetailsPage title={person.name}>
      <Section title="Details">
        <ul className="text-[7px] leading-tight text-black">
          <li>Birth Year: {person.birth_year}</li>
          <li>Gender: {person.gender}</li>
          <li>Eye Color: {person.eye_color}</li>
          <li>Hair Color: {person.hair_color}</li>
          <li>Height: {person.height}</li>
          <li>Mass: {person.mass}</li>
        </ul>
      </Section>

      <Section title="Movies">
        <ul className="text-[7px] leading-tight">
          {person.movies.map((movie: BaseMovie) => (
            <Fragment key={movie.id}>
              <li className="text-emerald-2 inline hover:underline last:[&_span]:hidden">
                <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                <span className="text-[#383838]">, </span>
              </li>
            </Fragment>
          ))}
        </ul>
      </Section>
    </BaseDetailsPage>
  );
}
