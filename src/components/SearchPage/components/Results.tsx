import { Fragment } from "react/jsx-runtime";

import { useSearchContext } from "@/src/context/SearchContext";
import { SearchType } from "@/src/context/SearchContext.types";

export default function Results() {
  const { results, isSearching } = useSearchContext();

  return (
    <div className="w-[291px] min-h-[291px] mt-[15px] p-[15px] grid gap-y-[5px] grid-rows-[auto_auto_1fr] bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
      <p className="text-[9px] font-bold">Results</p>

      <hr className="border-t-[0.5px] border-t-pinkish-grey" />

      {isSearching ? (
        <p className="flex items-center justify-center text-[7px] text-pinkish-grey text-center font-bold">
          Searching...
        </p>
      ) : (
        <>
          {results.length > 0 ? (
            <ul className="grid items-start gap-y-[5px] h-fit">
              {results.map((result) => (
                <Fragment key={result.uid}>
                  <li className="flex items-center justify-between">
                    <span className="text-[8px] font-bold">
                      {result.type === SearchType.PEOPLE
                        ? result.name
                        : result.title}
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
          ) : (
            <p className="flex items-center justify-center text-[7px] text-pinkish-grey text-center font-bold">
              There are zero matches.
              <br />
              Use the form to search for People or Movies.
            </p>
          )}
        </>
      )}
    </div>
  );
}
