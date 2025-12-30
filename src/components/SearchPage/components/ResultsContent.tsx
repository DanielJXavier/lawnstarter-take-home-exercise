import { Fragment } from "react/jsx-runtime";

import { useSearchContext } from "@/src/context/SearchContext";
import { SearchType } from "@/src/context/SearchContext.types";

export default function ResultsContent() {
  const { isSearching, error, results } = useSearchContext();

  if (isSearching) {
    return (
      <p className="flex items-center justify-center text-[7px] text-pinkish-grey text-center font-bold">
        Searching...
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex items-center justify-center text-[7px] text-pinkish-grey text-center font-bold">
        Oh no! An error occurred.
        <br />
        Please try again.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="flex items-center justify-center text-[7px] text-pinkish-grey text-center font-bold">
        There are zero matches.
        <br />
        Use the form to search for People or Movies.
      </p>
    );
  }

  return (
    <ul className="grid items-start gap-y-[5px] h-fit">
      {results.map((result) => (
        <Fragment key={result.uid}>
          <li className="flex items-center justify-between">
            <span className="text-[8px] font-bold">
              {result.type === SearchType.PEOPLE ? result.name : result.title}
            </span>

            <a
              className="px-2.5 py-1 bg-green-teal-2 rounded-[8.5px] text-[7px] font-bold text-white"
              href={`/${result.type}/${result.uid}`}
            >
              SEE DETAILS
            </a>
          </li>

          <hr className="border-t-[0.5px] border-t-pinkish-grey" />
        </Fragment>
      ))}
    </ul>
  );
}
