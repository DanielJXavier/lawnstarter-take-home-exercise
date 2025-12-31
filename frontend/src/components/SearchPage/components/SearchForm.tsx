import { useSearchContext } from "@/context/SearchContext";
import { SearchType } from "@/context/SearchContext.types";

import SearchTypeOption from "./SearchTypeOption";

export default function SearchForm() {
  const {
    searchType,
    searchTerm,
    setSearchTerm,
    isSearching,
    setIsSearching,
    setError,
    setResults,
  } = useSearchContext();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSearching(true);
    setError(false);

    try {
      const response = await fetch(
        `http://localhost:4000/search?type=${searchType}&term=${searchTerm}`
      );

      if (!response.ok) {
        setError(true);

        return;
      }

      const results = await response.json();

      setResults(results);
    } catch (error) {
      console.error(error);

      setError(true);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form
      className="w-[205px] mt-[15px] p-[15px] grid gap-y-2.5 bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]"
      onSubmit={handleSearch}
    >
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
      >
        {isSearching ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
