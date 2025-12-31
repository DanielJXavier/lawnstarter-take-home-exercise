import { Fragment } from "react/jsx-runtime";

import Link from "next/link";

import { Movie, BasePerson } from "@/types";

import BaseDetailsPage from "./BaseDetailsPage";
import Section from "./Section";

export default function MovieDetailsPage({ movie }: { movie: Movie }) {
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
            <Fragment key={character.id}>
              <li className="text-emerald-2 inline hover:underline last:[&_span]:hidden">
                <Link href={`/people/${character.id}`}>{character.name}</Link>
                <span className="text-[#383838]">, </span>
              </li>
            </Fragment>
          ))}
        </ul>
      </Section>
    </BaseDetailsPage>
  );
}
