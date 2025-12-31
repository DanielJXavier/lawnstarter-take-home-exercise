import { Fragment } from "react/jsx-runtime";

import Link from "next/link";

import { Person, BaseMovie } from "@/types";

export default function PersonDetailsPage({ person }: { person: Person }) {
  return (
    <div className="w-[402px] min-h-[208.5px] mt-[15px] mx-auto p-[15px] grid gap-y-[15px] grid-rows-[auto_1fr_auto] bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
      <h1 className="text-[9px] font-bold text-black">{person.name}</h1>

      <div className="grid grid-cols-[1fr_1fr] gap-x-[50px] items-start">
        <div className="grid gap-y-[2.5px]">
          <div className="grid gap-y-[5px]">
            <h2 className="text-[8px] font-bold text-black">Details</h2>
            <hr className="border-t-[0.5px] border-t-pinkish-grey" />
          </div>

          <ul className="text-[7px] leading-tight text-black">
            <li>Birth Year: {person.birth_year}</li>
            <li>Gender: {person.gender}</li>
            <li>Eye Color: {person.eye_color}</li>
            <li>Hair Color: {person.hair_color}</li>
            <li>Height: {person.height}</li>
            <li>Mass: {person.mass}</li>
          </ul>
        </div>

        <div className="grid gap-y-[2.5px]">
          <div className="grid gap-y-[5px]">
            <h2 className="text-[8px] font-bold text-black">Movies</h2>
            <hr className="border-t-[0.5px] border-t-pinkish-grey" />
          </div>

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
        </div>
      </div>

      <Link
        className="w-fit px-4.5 py-1 border-[0.5px] border-green-teal-2 bg-green-teal-2 rounded-[8.5px] text-[7px] font-bold text-white uppercase leading-2"
        href="/"
      >
        Back to search
      </Link>
    </div>
  );
}
