import { useSearchContext } from "@/src/context/SearchContext";

export default function Results() {
  const { isSearching } = useSearchContext();

  return (
    <div className="w-[291px] min-h-[291px] mt-[15px] p-[15px] grid gap-y-[5px] grid-rows-[auto_auto_1fr] bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
      <p className="text-[9px] font-bold">Results</p>

      <hr className="border-t-[0.5px] border-t-pinkish-grey" />

      <p className="flex items-center justify-center text-[7px] text-pinkish-grey text-center font-bold">
        {isSearching ? (
          <>Searching...</>
        ) : (
          <>
            There are zero matches.
            <br />
            Use the form to search for People or Movies.
          </>
        )}
      </p>
    </div>
  );
}
