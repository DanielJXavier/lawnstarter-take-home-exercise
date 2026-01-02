import Link from "next/link";

import { Movie, BasePerson } from "@/types";

import BaseDetailsPage from "./BaseDetailsPage";
import Section from "./Section";

type MovieDetailsPageProps = {
  movie: Movie;
};

export default function MovieDetailsPage({ movie }: MovieDetailsPageProps) {
  return (
    <BaseDetailsPage title={movie.title}>
      <Section title="Opening Crawl">
        <p className="text-[7px] leading-tight text-black whitespace-pre-wrap">
          {movie.opening_crawl}
        </p>
      </Section>

      <Section title="Characters">
        <ul className="text-[7px] leading-tight">
          {movie.characters.map((character: BasePerson) => (
            <li
              key={character.id}
              className="text-emerald-2 inline hover:underline last:[&_span]:hidden"
            >
              <Link href={`/people/${character.id}`}>{character.name}</Link>
              <span className="text-[#383838]">, </span>
            </li>
          ))}
        </ul>
      </Section>
    </BaseDetailsPage>
  );
}
