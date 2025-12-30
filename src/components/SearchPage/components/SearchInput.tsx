import { useSearchContext } from "@/src/context/SearchContext";
import { SearchType } from "@/src/context/SearchContext.types";

import SearchTypeOption from "./SearchTypeOption";

export default function SearchInput() {
  const { searchType, searchTerm, setSearchTerm, isSearching, setIsSearching } =
    useSearchContext();

  return (
    <div className="w-[205px] mt-[15px] p-[15px] grid gap-y-2.5 bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
      <p className="text-[7px] font-semibold">What are you searching for?</p>

      <div className="flex gap-x-[15px]">
        <SearchTypeOption option={SearchType.PEOPLE} />
        <SearchTypeOption option={SearchType.MOVIES} />
      </div>

      <input
        className="px-[5px] py-1.5 rounded-xs border-[0.5px] border-[#383838] placeholder-shown:border-green-teal shadow-[inset_0_0.5px_1.5px_0_var(--color-warm-grey-75)] text-[7px] font-bold placeholder-pinkish-grey outline-none"
        type="text"
        placeholder={
          searchType === SearchType.PEOPLE
            ? "e.g. Chewbacca, Yoda, Boba Fett"
            : "e.g. A New Hope, The Empire Strikes Back, Return of the Jedi"
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="py-1 rounded-[10px] border-[0.5px] broder-green-teal-2 disabled:border-pinkish-grey bg-green-teal-2 disabled:bg-pinkish-grey text-white font-bold text-[7px] uppercase cursor-pointer disabled:cursor-not-allowed outline-none"
        disabled={!searchTerm}
        onClick={() => setIsSearching(true)}
      >
        {isSearching ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
